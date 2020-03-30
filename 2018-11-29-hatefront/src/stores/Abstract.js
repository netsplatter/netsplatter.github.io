import { set, observable, action } from 'mobx';

import {fetch as fetchPolyfill} from 'whatwg-fetch';
import AppStore from '@stores/App';
import AbortController from "abort-controller";
import RoutingStore from '@stores/Routing';

class AbstractStore {

  @observable loading = false;

  constructor() {}

  options(method) {
    const { token } = AppStore;

    return {
      method: method,
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      },
    };
  }

  get = async (data) => {
    const { request } = this;
    const {url, opts, isGlobal, silent, noAbort, abortName} = data;
    const config = this.options('GET');
    Object.assign(config, opts || {});
    return await request({url, options: config, isGlobal, silent, noAbort, abortName});
  };

  post = async (data) => {
    const { request } = this;
    const {url, body, opts, isGlobal, silent, noAbort, abortName} = data;
    const config = this.options('POST');
    Object.assign(config, opts || {});
    config.body = JSON.stringify(body);
    return await request({url, options: config, isGlobal, silent, noAbort, abortName});
  };

  setLoading (value, isGlobal, silent) {
    if (!silent) {
      set(this, { loading: value });
    }
    if (isGlobal) {
      AppStore.loading = value;
    }
  }

  request = async ({url, options, isGlobal, silent, noAbort, abortName}) => {
    this.setLoading(true, isGlobal, silent);
    const abortKey = abortName || url;
    if (!noAbort) {
      if (AppStore.abortControllers[abortKey]) {
        AppStore.abortControllers[abortKey].abort();
      }
      AppStore.abortControllers[abortKey] = new AbortController();
      options.signal = AppStore.abortControllers[abortKey].signal;
    }

    return await fetchPolyfill(`${process.env.HOST}${url}`, options)
      .catch(err => {
        this.setLoading(false, isGlobal, silent);
        return Promise.reject({body: err, response: err, abort: err instanceof DOMException});
      })
      .then(response => {
        const responseCopy = response.clone();
        return responseCopy.json()
          .then(body => ({body, response}))
          .catch(_ => response.text().then(text => ({text, response})));
      })
      .then(({body, response}) => {
        this.setLoading(false, isGlobal, silent);
        if (!response.status || response.status >= 400) {
          if (response.status === 401) {
            this.abortAll();
            RoutingStore.push('/login');
            return Promise.reject({body: new Error("Истек срок токена авторизации"), response});
          }
          return Promise.reject({body: body || new Error("Network error"), response});
        }
        if (body && body.result === false) {
          body.message = body.detail || 'внутренняя ошибка сервера';
          return Promise.reject({body, response});
        }
        return Promise.resolve({body, response});
      });
  };

  abort(key) {
    if (AppStore.abortControllers[key]) {
      AppStore.abortControllers[key].abort();
    }
  }

  abortAll() {
    for (let key in AppStore.abortControllers) {
      this.abort(key);
    }
  };

}

export default AbstractStore;

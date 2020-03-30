import { action, set, observable, computed } from 'mobx';
import AbstractStore from '@stores/Abstract';
import RoutingStore from '@stores/Routing';
import AppStore from '@stores/App';
import {errorHandler} from '@utils/Api';

class UserStore extends AbstractStore {

  @observable currentUser = null;
  @observable items = [];
  @observable roles = [];
  @observable logs = [];

  constructor(...args) {
    super(...args);
  }

  profile = async (throwError) => {
    const { get } = this;
    const url = `/profile`;
    try {
      const {body} = await get({url, isGlobal: true});
      this.currentUser = body.data;
    } catch (e) {
      errorHandler.call(this, {showToast: true}, e);
      if (!e.abort) {
        RoutingStore.push('/login');
      }
      if (throwError) {
        throw e;
      }
    }
  };

  list = async () => {
    const { get } = this;
    const url = `/users`;
    try {
      const {body} = await get({url});
      this.items = body.data;
    } catch (e) {
      errorHandler.call(this, {showToast: true}, e);
    }
  };

  roleList = async () => {
    const { get } = this;
    const url = `/roles`;
    try {
      const {body} = await get({url});
      this.roles = body.data;
    } catch (e) {
      errorHandler.call(this, {showToast: true}, e);
    }
  };

  logList = async (body) => {
    const { post } = this;
    const url = `/logs`;
    try {
      const res = await post({url, body});
      this.logs = res.body.data;
    } catch (e) {
      errorHandler.call(this, {showToast: true}, e);
    }
  };

  login = async (headers) => {
    const { get } = this;
    const url = `/login`;
    return await get({url, opts: headers, isGlobal: true});
  };

  update = async (user) => {
    const { post } = this;
    const url = `/user/save`;
    const {id_User, username, fullname, id_role, pass} = user;
    const body = {
      id_user: id_User || 0,
      username,
      fullname,
      id_role
    };
    if (pass) {
      body.pass = pass;
    }
    this.loading = true;
    try {
      await post({url, body, silent: true});
      AppStore.toggleModal(null);
      await this.list();
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  remove = async (id) => {
    const { get } = this;
    const url = `/user/drop?user=${id}`;
    this.loading = true;
    try {
      await get({url, silent: true});
      await this.list();
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

}

export default new UserStore();
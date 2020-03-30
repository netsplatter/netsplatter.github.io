import { action, set, observable, computed } from 'mobx';
import AbstractStore from '@stores/Abstract';
import AppStore from '@stores/App';
import ProjectStore from '@stores/Project';
import {errorHandler} from '@utils/Api';
import _ from 'underscore';
import moment from 'moment';

class ClientStore extends AbstractStore {

  @observable search = '';
  @observable sortBy = AppStore.cookie.get('hate_sort') || 'name';

  @observable _items = [];
  @observable _oldItems = [];
  @observable selectedClient = undefined;
  @computed get items() {
    return this.getComputedItems(this._items);
  }

  @computed get oldItems() {
    return this.getComputedItems(this._oldItems);
  }

  constructor(...args) {
    super(...args);
  }

  getComputedItems = (sourceArray) => {
    let array = sourceArray.filter(row => new RegExp(this.search, 'gi').test(row.name));
    const isReverseSort = this.isReverse(this.sortBy);
    const key = isReverseSort ? this.sortBy.substring(1) : this.sortBy;
    switch (key) {
      case 'name':
        array = _.sortBy(array, item => item[key].toLowerCase());
        break;
      case 'importance':
      case 'frequent':
        array = _.sortBy(array, item => item[key]);
        break;
      case 'recent':
        array = _.sortBy(array, item => moment(item[key]));
        break;
    }
    if (isReverseSort) {
      array.reverse();
    }
    return array;
  };

  isReverse = (value) => {
    return value.indexOf("-") > -1;
  };

  changeSort = (value) => {
    if (!value) {
      this.sortBy = this.isReverse(this.sortBy) ? this.sortBy.substring(1) : `-${this.sortBy}`;
    } else {
      this.sortBy = value;
    }
    AppStore.cookie.set('hate_sort', this.sortBy);
  };

  listParallel = async () => {
    this.loading = true;
    try {
      await Promise.all([
        await this.list(false, true),
        await this.list(true, true)
      ]);
    } catch(e) {}
    this.loading = false;
  };

  list = async (closed, silent) => {
    const {get} = this;
    const url = `/clients?closed=${closed ? 'yes' : 'no'}`;
    const key = closed ? '_oldItems' : '_items';
    try {
      const res = await get({url, silent});
      this[key] = res.body.data;
      if (!this.selectedClient) {
        this.selectClient(this.items[0]);
      }
    } catch (e) {
      errorHandler.call(this, {showToast: true}, e);
    }
  };

  create = async (name) => {
    const { post } = this;
    const url = `/client/save`;
    const body = {
      id_client: 0,
      name
    };
    if (!name) {
      return false;
    }
    this.loading = true;
    try {
      await post({url, body, silent: true});
      await this.list(false, false);
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  close = async (id, isOld) => {
    const { get } = this;
    const url = `/client/close?client=${id}&closed=${isOld ? 'no' : 'yes'}`;
    this.loading = true;
    try {
      await get({url, silent: true});
      await this.listParallel(false, false);
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  remove = async (id, isOld) => {
    const { get } = this;
    const url = `/client/drop?client=${id}`;
    this.loading = true;
    try {
      await get({url, silent: true});
      await this.list(isOld);
      if (id === this.selectedClient.id_Client) {
        this.selectClient(this.items[0]);
      }
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  selectClient(item) {
    if (item && this.selectedClient && this.selectedClient.id_Client === item.id_Client) {
      return false;
    }
    this.selectedClient = item;
    ProjectStore.selectClient(item);
  }

}

export default new ClientStore();
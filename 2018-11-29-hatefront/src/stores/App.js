import { computed, observable, reaction } from 'mobx';
import Cookies from 'universal-cookie';
import RoutingStore from '@stores/Routing';

class AppStore {

  @observable loading = false;
  @observable modal = null;

  abortControllers = {

  };
  token = null;

  constructor() {
    const { cookie } = this;
    const token = cookie.get('hate_token'); //this thing returns 'undefined' string if no token
    this.token = token !== 'undefined' ? token : null;
    RoutingStore.history.subscribe((location, action) => {
      this.modal = null;
    });
  }

  get cookie() {
    return new Cookies();
  }

  setToken(data, remember) {
    const { cookie } = this;
    this.token = data; //just store in memory
    if (remember) {
      cookie.set('hate_token', data);
    }
  }

  removeToken() {
    const { cookie } = this;
    cookie.remove('hate_token');
    RoutingStore.push('/login');
  }

  toggleModal = (value) => {
    this.modal = value;
  }

}

export default new AppStore();


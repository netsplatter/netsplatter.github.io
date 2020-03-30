import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import RoutingStore from '@stores/Routing';

@inject('UserStore', 'AppStore', 'RoutingStore')
@observer
class Header extends Component {

  logout = () => {
    this.props.AppStore.removeToken();
  };

  render() {
    const { props, logout } = this;
    const { UserStore } = props;
    const { currentUser } = UserStore;
    const { fullname } = currentUser;

    return (
      <div className="header container-fluid">
        <div className="header__logo" onClick={() => RoutingStore.push('/')}>HATE</div>
        <div className="header__info">
          <div className="header__info--user">{fullname}</div>
          <div className="header__info--logout" onClick={logout}>Выйти</div>
        </div>
      </div>
    );
  }
}

export default Header;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/secure/Header';
import Clients from '@components/Clients';
import CardBox from '@components/common/CardBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { observer, inject } from 'mobx-react';
import ErrorBoundary from '@components/common/ErrorBoundary';


@inject('UserStore')
class Secure extends Component {

  render() {
    const { children, UserStore } = this.props;
    const { role_Code } = UserStore.currentUser;

    return (
      <>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        <div className="container-fluid main-container">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-first">
              <ErrorBoundary>
                <Clients />
              </ErrorBoundary>
              { ["admin", "boss"].indexOf(role_Code) > -1 ? (
                <CardBox>
                  <Link to="/categories" className={'section-menu-item' + (location.pathname === '/categories' ? ' active' : '')}>
                    <FontAwesomeIcon icon={faThList} />
                    Категории трат
                  </Link>
                </CardBox>
              ) : null }
              { ["admin"].indexOf(role_Code) > -1 ? (
                <>
                  <CardBox>
                    <Link to="/users" className={'section-menu-item' + (location.pathname === '/users' ? ' active' : '')}>
                      <FontAwesomeIcon icon={faThList} />
                      Пользователи
                    </Link>
                  </CardBox>
                  <CardBox>
                    <Link to="/logs" className={'section-menu-item' + (location.pathname === '/logs' ? ' active' : '')}>
                      <FontAwesomeIcon icon={faClock} />
                      Логи
                    </Link>
                  </CardBox>
                </>
              ) : null }

            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 col-second">
              <ErrorBoundary>
                { children }
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Secure;
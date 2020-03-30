import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import Loadable from 'react-loadable';
import Loader from '@components/common/Loader';
import Secure from '@components/secure/Secure';
import createBrowserHistory from 'history/createBrowserHistory';
import RoutingStore from '@stores/Routing';
import { syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, RoutingStore);

import Home from '@routes/Home';
import User from '@routes/User';
import Log from '@routes/Log';
import Login from '@routes/Login';
import Category from '@routes/Category';

const TREE = {
  '/users': {
    component: User,
    needAuth: true
  },
  '/logs': {
    component: Log,
    needAuth: true
  },
  '/categories': {
    component: Category,
    needAuth: true
  },
  '/': {
    component: Home,
    needAuth: true
  },
  /*'/login': {
    component: 'Login',
    needAuth: false
  },
  '/!*': {
    component: 'Home',
    needAuth: false
  },*/
};

let loaderAttrs = {
  type: "Ball-Triangle",
  color: "#cef442",
  height: "100",
  width: "100"
};

@inject('AppStore')
@observer
class LoadingWrapper extends Component {
  render() {
    const { props } = this;
    const { AppStore } = props;
    const { loading } = AppStore;
    if (!loading) {
      return null;
    }
    return <Loader {...loaderAttrs} />;
  };
}

@inject('UserStore', 'AppStore')
class AppRouter extends Component {

  state = {
    loaded: false
  };

  componentDidMount() {
    const { props } = this;
    const { UserStore, AppStore } = props;
    const { profile } = UserStore;
    const { token } = AppStore;

    if (token && location.pathname !== '/login') {
      profile()
        .then(() => {
          this.setState({loaded: true});
        });
    } else {
      this.setState({loaded: true});
    }
  };

  get isAuth() {
    const { props } = this;
    const { AppStore } = props;
    const { token } = AppStore;

    return !!token;
  };

  get redirect() {
    const attrs = {
      to: '/login',
      push: true,
    };

    return <Redirect {...attrs} />;
  };

  get router() {
    const { routes, state } = this;
    const { loaded } = state;
    if (!loaded) {
      return null;
    }
    return (
      <Router history={history}>
        <Switch>
          { routes }
        </Switch>
      </Router>
    );
  };

  get routes() {
    const { redirect } = this;
    /*return Object.keys(TREE).map((path) => {

      const { component, needAuth, childRoutes } = TREE[path];

      const LoadableRoute = Loadable({
        loader: () => import(`@routes/${ component }`),
        loading() {
          return <Loader {...loaderAttrs} />;
        },
        delay: 0,
        render: (loaded, props) => {
          const RenderedComponent = loaded.default;
          return <RenderedComponent {...props} />;
        },
      });

      const attrs = {
        key: path,
        path,
        exact: true,
        render: props => {
          const { isAuth } = this;
          return (needAuth && !isAuth) ? redirect : <LoadableRoute {...props} />;
        }
      };

      return <Route {...attrs} />;
    });*/
    return (
      <>
        <Route path="/" render={(props) => {
          const { isAuth } = this;
          if (props.location.pathname === '/login') {
            return null;
          }
          return isAuth ? (
            <Secure>
              <Switch>
                {Object.keys(TREE).map((path, index) => <Route exact key={index + 1} path={path} component={TREE[path].component} />)}
                <Redirect to="/" />
              </Switch>
            </Secure>
          ) : redirect;
        }} />
        <Route exact path="/login" component={Login} />
      </>
    );
  };

  render() {
    const { router } = this;

    return (
      <div>
        { router }
        <ToastContainer
          hideProgressBar
          autoClose={5000}
          closeOnClick
          pauseOnHover
          pauseOnVisibilityChange
          draggable
        />
        <LoadingWrapper />
      </div>
    );
  };
}

export default AppRouter;

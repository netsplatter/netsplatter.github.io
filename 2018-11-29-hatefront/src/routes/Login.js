import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import {errorHandler} from '@utils/Api';
import { Button, FormGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import InputGroup from '@components/common/InputGroup';
import * as Yup from 'yup';
import { faCheck } from "@fortawesome/free-solid-svg-icons/index";

const Schema = Yup.object().shape({
  login: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

@inject('UserStore', 'RoutingStore', 'AppStore', 'ClientStore')
@observer
class Login extends Component {

  state = {
    login: '',
    password: '',
    remember: true
  };

  onSubmit = (values, actions) => {
    const { props } = this;
    const { UserStore, RoutingStore, AppStore, ClientStore } = props;
    const { login, password, remember } = values;
    const headers = {
      User: login,
      Pass: password
    };
    UserStore.login({headers})
      .then(({body}) => {
        const { data } = body;
        AppStore.setToken(data, remember);
        ClientStore.selectClient(null);
        return UserStore.profile(true)
          .then(() => RoutingStore.push('/'))
          .catch(() => {})
      })
      .catch(errorHandler.bind(this, {showToast: true}));
  };

  render() {
    const { state, onSubmit, props } = this;
    const { UserStore } = props;
    const { loading } = UserStore;
    return (
      <Formik
        initialValues={state}
        validationSchema={Schema}
        onSubmit={onSubmit}
        render={({values, touched, errors, handleSubmit, handleChange, handleBlur, submitCount}) => {
          const loginAttrs = {
            type: "text",
            placeholder: "Логин",
            icon: <FontAwesomeIcon icon={faEnvelope} />,
            leftPosition: true,
            value: values.login,
            name: 'login',
            onChange: handleChange,
            onSubmit: handleSubmit,
            onBlur: handleBlur,
            invalid: touched.login && errors.login || submitCount > 0 && errors.login
          };
          const passwordAttrs = {
            type: "password",
            placeholder: "Пароль",
            icon: <FontAwesomeIcon icon={faKey} />,
            leftPosition: true,
            value: values.password,
            name: 'password',
            onChange: handleChange,
            onSubmit: handleSubmit,
            onBlur: handleBlur,
            invalid: touched.password && errors.password || submitCount > 0 && errors.password
          };
          return (
            <form noValidate className="login-container" onSubmit={handleSubmit}>
              <div className="login-container__header">HATE</div>

              <FormGroup>
                <InputGroup {...loginAttrs} />
              </FormGroup>
              <FormGroup>
                <InputGroup {...passwordAttrs} />
              </FormGroup>
              <div className="login-container__remember">
                <label>
                  <input type="checkbox" id="remember" name="remember" checked={values.remember} onChange={handleChange}/>
                  <label htmlFor="remember">
                      <FontAwesomeIcon icon={faCheck} />
                      Запомнить меня
                  </label>
                </label>
              </div>
              <Button type="submit" variant="outline-success" disabled={loading}>
                Вход
              </Button>
            </form>
          )
        }}
      />
    );
  }
}

export default Login;
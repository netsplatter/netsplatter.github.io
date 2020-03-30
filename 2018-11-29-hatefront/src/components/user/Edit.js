import React, { Component } from 'react';
import InputGroup, {InputGroupWrapper} from '@components/common/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';

class UserModel {
  constructor(data) {
    Object.assign(this, data);
    this.fullname = data.fullname || '';
    this.pass = data.pass || '';
    if (data.id_Role) {
      this.id_role = data.id_Role;
    }
  }
}

const Schema = Yup.object().shape({
  fullname: Yup.string()
    .required('Required'),
  username: Yup.string()
    .required('Required'),
  id_role: Yup.string()
    .required('Required'),
});

@inject('UserStore')
@observer
export default class UserEditModal extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = new UserModel(value);
    this.state.pass2 = '';
  }
  componentDidMount() {
    const { roles, roleList } = this.props.UserStore;
    if (!roles.length) {
      roleList();
    }
  }
  render() {
    const { props, state } = this;
    const { UserStore } = props;
    const { roles, loading } = UserStore;

    const isNew = !state.id_User;

    return (
      <Modal.Body>
        <Formik
          initialValues={state}
          validationSchema={Schema}
          onSubmit={values => {
            if (isNew && !values.pass || values.pass && values.pass !== values.pass2) {
              return false;
            }
            UserStore.update(values);
          }}
          render={({values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, submitCount}) => {

            const nameInputAttrs = {
              type: "text",
              placeholder: "Имя",
              icon: null,
              leftPosition: true,
              name: "fullname",
              value: values.fullname,
              onChange: handleChange,
              onBlur: handleBlur,
              invalid: touched.fullname && errors.fullname || submitCount > 0 && errors.fullname
            };

            const loginInputAttrs = {
              type: "text",
              placeholder: "Логин",
              icon: null,
              leftPosition: true,
              name: "username",
              value: values.username,
              onChange: handleChange,
              onBlur: handleBlur,
              invalid: touched.username && errors.username || submitCount > 0 && errors.username
            };

            const passInputAttrs = {
              type: "password",
              placeholder: 'Пароль',
              icon: null,
              leftPosition: true,
              name: "pass",
              value: values.pass,
              onChange: handleChange,
              invalid: isNew && submitCount > 0 && !values.pass || values.pass && values.pass !== values.pass2 && submitCount > 0
            };

            const pass2InputAttrs = {
              type: "password",
              placeholder: "Пароль повторно",
              icon: null,
              leftPosition: true,
              name: "pass2",
              value: values.pass2,
              onChange: handleChange,
              invalid: values.pass && values.pass !== values.pass2 && submitCount > 0
            };

            const roleWrapperAttrs = {
              leftPosition: true,
              wrapInput: true,
              invalid: submitCount > 0 && errors.id_role,
              icon: <FontAwesomeIcon icon={faUser} className="opacity-half" onClick={(event) => this.select.focus(event)} />
            };

            const roleAttrs = {
              ref: ref => { this.select = ref; },
              className: "hate-select-container",
              classNamePrefix: "hate-select",
              value: roles.find(o => o.id_Role === values.id_role),
              placeholder: "Роль",
              isClearable: false,
              isSearchable: false,
              isLoading: loading,
              openMenuOnFocus: true,
              onChange: v => setFieldValue('id_role', v.value),
              options: roles.map((row) => {
                row.value = row.id_Role;
                row.label = row.name;
                return row;
              })
            };
            return (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup {...nameInputAttrs} />
                </FormGroup>
                <FormGroup>
                  <InputGroup {...loginInputAttrs} />
                </FormGroup>
                <FormGroup>
                  <InputGroupWrapper {...roleWrapperAttrs}>
                    <Select {...roleAttrs}/>
                  </InputGroupWrapper>
                </FormGroup>
                <FormGroup>
                  <InputGroup {...passInputAttrs} />
                </FormGroup>
                { values.pass ? (
                  <FormGroup>
                    <InputGroup {...pass2InputAttrs} />
                  </FormGroup>
                ) : null }
                <Button type="submit" variant="outline-success" disabled={loading}>{ values.id_User ? 'Изменить' : 'Создать'}</Button>
              </form>
            )
          }}
        />
      </Modal.Body>
    );
  }
}
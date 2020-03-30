import React, { Component } from 'react';
import InputGroup, {InputGroupWrapper} from '@components/common/InputGroup';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

class CategoryModel {
  constructor(data) {
    Object.assign(this, data);
    this.name = data.name || '';
    this.id_Category = data.id_Category || 0;
  }
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
});

@inject('ProjectStore')
export default class CategoryEditModal extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = new CategoryModel(value);
  }
  render() {
    const { props, state } = this;
    const { loading, updatePaymentCategory } = props.ProjectStore;

    return (
      <Modal.Body>
        <Formik
          initialValues={state}
          validationSchema={Schema}
          onSubmit={values => {
            updatePaymentCategory(values);
          }}
          render={({values, touched, errors, handleSubmit, handleChange, handleBlur, submitCount}) => {
            const nameInputAttrs = {
              type: "text",
              placeholder: "Название",
              icon: null,
              leftPosition: true,
              name: "name",
              value: values.name,
              onChange: handleChange,
              onBlur: handleBlur,
              invalid: touched.name && errors.name || submitCount > 0 && errors.name
            };

            return (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup {...nameInputAttrs} />
                </FormGroup>
                <Button type="submit" variant="outline-success" disabled={loading}>{ values.id_Category ? 'Изменить' : 'Создать'}</Button>
              </form>
            )
          }}
        />
      </Modal.Body>
    );
  }
}
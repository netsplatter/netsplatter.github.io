import React, { Component } from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import InputGroup, {InputGroupWrapper} from '@components/common/InputGroup';
import DatePicker from 'react-datepicker';
import { DatepickerCustom } from '@components/common/Datepicker';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'underscore';


class PaymentModel {
  constructor(data) {
    Object.assign(this, data);
    this.notes = data.notes || '';
    this.amount = data.amount || '';
    if (data.dateIssue) {
      this.dateIssue = moment(data.dateIssue);
    }
    this.type = data.type || false;
    this.id_Expense = data.id_Expense || 0;
  }
}

const Schema = Yup.object().shape({
  notes: Yup.string()
    .required('Required'),
  amount: Yup.number()
    .min(0)
    .required('Required'),
  // id_Category: Yup.number(),
  // dateIssue: Yup.string(),
  type: Yup.boolean(),
});

@inject('ProjectStore')
@observer
export default class PaymentEditModal extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = new PaymentModel(value);
    this.savedState = new PaymentModel(value);
  }
  submitted = false;
  componentWillUnmount() {
    if (!_.isEqual(this.savedState, this.state) && this.state.notes && !this.submitted) {
      this.props.ProjectStore.updatePayment(this.state);
    }
  }
  componentDidMount() {
    setTimeout(() => this.props.ProjectStore.paymentCategoryList(), 0);
  }
  handleFormChange = (key, value, updateFormik) => {
    this.setState({[key]: value}, () => {
      updateFormik(key, value);
    })
  };
  render() {
    const { props, state, handleFormChange } = this;
    const { notes, amount, dateIssue, id_Expense, id_Category, type } = state;
    const { ProjectStore } = props;
    const { categories, loading } = ProjectStore;

    const typeOpts = [
      {
        value: false,
        label: 'безнал'
      },
      {
        value: true,
        label: 'наличные'
      }
    ];

    return (
      <Modal.Body>
        <Formik
          initialValues={state}
          validationSchema={Schema}
          onSubmit={values => {
            this.submitted = true;
            ProjectStore.updatePayment(values);
          }}
          render={({values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, submitCount}) => {
            const nameInputAttrs = {
              type: "text",
              placeholder: "Название траты",
              icon: null,
              name: "notes",
              leftPosition: true,
              value: values.notes,
              onChange: e => handleFormChange('notes', e.target.value, setFieldValue),
              onBlur: handleBlur,
              invalid: touched.notes && errors.notes || submitCount > 0 && errors.notes
            };

            const amountInputAttrs = {
              type: "number",
              placeholder: "Сумма",
              icon: null,
              name: "amount",
              leftPosition: true,
              value: values.amount,
              onChange: e => handleFormChange('amount', e.target.value, setFieldValue),
              onBlur: handleBlur,
              invalid: touched.amount && errors.amount || submitCount > 0 && errors.amount,
              min: 0
            };

            const dateIssueAttrs = {
              customInput: <DatepickerCustom customPlaceholder="Когда получить" invalid={submitCount > 0 && errors.dateIssue} />,
              selected: values.dateIssue,
              onChange: v => handleFormChange('dateIssue', v, setFieldValue)
            };

            const categoryWrapperAttrs = {
              leftPosition: true,
              wrapInput: true,
              invalid: submitCount > 0 && errors.id_Category
            };

            const categoryAttrs = {
              className: "hate-select-container",
              classNamePrefix: "hate-select",
              value: categories.find(o => o.id_Category === values.id_Category),
              placeholder: "Категория",
              isClearable: false,
              isSearchable: false,
              isLoading: loading,
              onChange: v => handleFormChange('id_Category', v.value, setFieldValue),
              options: categories.map(row => {
                row.value = row.id_Category;
                row.label = row.name;
                return row;
              })
            };

            const typeWrapperAttrs = {
              leftPosition: true,
              wrapInput: true,
              invalid: submitCount > 0 && errors.type
            };

            const typeAttrs = {
              className: "hate-select-container",
              classNamePrefix: "hate-select",
              value: typeOpts.find(o => o.value === values.type),
              placeholder: "Тип",
              isClearable: false,
              isSearchable: false,
              onChange: v => handleFormChange('type', v.value, setFieldValue),
              options: typeOpts
            };

            return (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup {...nameInputAttrs} />
                </FormGroup>
                <FormGroup>
                  <InputGroup {...amountInputAttrs} />
                </FormGroup>
                <FormGroup>
                  <InputGroupWrapper {...categoryWrapperAttrs}>
                    <Select {...categoryAttrs}/>
                  </InputGroupWrapper>
                </FormGroup>
                <FormGroup>
                  <InputGroupWrapper {...typeWrapperAttrs}>
                    <Select {...typeAttrs}/>
                  </InputGroupWrapper>
                </FormGroup>
                <FormGroup>
                  <DatePicker {...dateIssueAttrs} />
                </FormGroup>
                <Button type="submit" variant="outline-success" disabled={ProjectStore.loading}>{ id_Expense ? 'Изменить' : 'Создать'}</Button>
              </form>
            );
          }}
      />
      </Modal.Body>
    );
  }
}
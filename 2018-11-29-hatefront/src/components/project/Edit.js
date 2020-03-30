import React, { Component } from 'react';
import InputGroup, {InputGroupWrapper, InputGroupFormik} from '@components/common/InputGroup';
import { DatepickerCustom } from '@components/common/Datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { observer, inject } from 'mobx-react';
import {toJS} from 'mobx';
import Select from 'react-select';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';

class ProjectModel {
  constructor(data) {
    Object.assign(this, data);
    this.name = data.name || '';
    this.budget = data.budget || '';
    this.team = data.team && data.team.length ? toJS(data.team.map(row => {
      row.value = row.id_Member;
      row.label = row.fullname;
      return row;
    })) : [];
    if (data.dateBegin) {
      this.dateBegin = moment(data.dateBegin);
    }
    if (data.dateEnd) {
      this.dateEnd = moment(data.dateEnd);
    }
  }
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  // budget: Yup.string(),
  // dateBegin: Yup.string(),
  // team: Yup.array(),
});

@inject('UserStore', 'ProjectStore')
@observer
export default class ProjectEditModal extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = new ProjectModel(value);
  }
  componentDidMount() {
    this.props.UserStore.list();
  }
  render() {
    const { props, state } = this;
    const { name, budget, dateBegin, dateEnd, id_Project, team } = state;
    const { UserStore, ProjectStore } = props;
    const { items, loading } = UserStore;

    return (
      <Modal.Body>
        <Formik
          initialValues={state}
          validationSchema={Schema}
          onSubmit={values => {
            ProjectStore.update(values);
          }}
          render={({values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, submitCount}) => {
            const nameInputAttrs = {
              type: "text",
              placeholder: "Название проекта",
              icon: null,
              leftPosition: true,
              name: "name",
              value: values.name,
              onChange: handleChange,
              onBlur: handleBlur,
              invalid: touched.name && errors.name || submitCount > 0 && errors.name
            };

            const budgetInputAttrs = {
              type: "number",
              placeholder: "Плановый бюджет",
              icon: null,
              leftPosition: true,
              name: "budget",
              value: values.budget,
              onChange: handleChange,
              min: 0,
              invalid: touched.budget && errors.budget || submitCount > 0 && errors.budget
            };

            const startAttrs = {
              customInput: <DatepickerCustom customPlaceholder="Дата начала" invalid={submitCount > 0 && errors.dateBegin} />,
              selectsStart: true,
              selected: values.dateBegin,
              startDate: values.dateBegin,
              endDate: values.dateEnd,
              onChange: (v) => setFieldValue('dateBegin', v)
            };

            const endAttrs = {
              customInput: <DatepickerCustom customPlaceholder="Дата окончания" invalid={submitCount > 0 && errors.dateEnd} />,
              selectsEnd: true,
              selected: values.dateEnd,
              startDate: values.dateBegin,
              endDate: values.dateEnd,
              onChange: (v) => setFieldValue('dateEnd', v)
            };

            const teamWrapperAttrs = {
              leftPosition: true,
              wrapInput: true,
              invalid: submitCount > 0 && errors.team,
              icon: <FontAwesomeIcon icon={faUser} className="opacity-half" onClick={(event) => this.select.focus(event)} />
            };
            return (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup {...nameInputAttrs} />
                </FormGroup>
                <FormGroup>
                  <InputGroup {...budgetInputAttrs} />
                </FormGroup>
                <FormGroup>
                  <DatePicker {...startAttrs} />
                </FormGroup>
                <FormGroup>
                  <DatePicker {...endAttrs} />
                </FormGroup>
                <FormGroup>
                  <InputGroupWrapper {...teamWrapperAttrs}>
                    <Select
                      ref={ ref => { this.select = ref; }}
                      className="hate-select-container add-employees"
                      classNamePrefix="hate-select"
                      value={values.team}
                      placeholder="Добавить сотрудников"
                      isMulti
                      isClearable={false}
                      isLoading={loading}
                      openMenuOnFocus
                      onChange={v => setFieldValue('team', v)}
                      options={items.map((row) => {
                        row.value = row.id_User;
                        row.label = row.fullname;
                        return row;
                      })}
                    />
                  </InputGroupWrapper>
                </FormGroup>
                <Button type="submit" variant="outline-success" disabled={ProjectStore.loading}>{ id_Project ? 'Изменить' : 'Создать'}</Button>
              </form>
            )
          }}
        />
      </Modal.Body>
    );
  }
}
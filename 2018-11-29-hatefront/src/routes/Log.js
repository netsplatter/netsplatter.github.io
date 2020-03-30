import React, { Component } from 'react';
import CardBox from '@components/common/CardBox';
import { observer, inject } from 'mobx-react';
import {LoaderContainer} from '@components/common/Loader';
import { SortableHeader, SortableTable, UltimatePagination } from '@components/common/Table';
import {formatDate} from '@utils/Formatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import {InputGroupWrapper} from '@components/common/InputGroup';
import DatePicker from 'react-datepicker';
import { DatepickerCustom } from '@components/common/Datepicker';
import moment from 'moment';
const offset = moment().utcOffset();

const subjects = [
  {value: 'User', label: 'Пользователь'},
  {value: 'Comment', label: 'Комментарий'},
  {value: 'Expense', label: 'Трата'},
  {value: 'Category', label: 'Категория'},
  {value: 'Client', label: 'Клиент'},
  {value: 'Project', label: 'Проект'},
];

const perPages = [
  {value: 20, label: 20},
  {value: 50, label: 50},
  {value: 100, label: 100},
  {value: 'all', label: 'Все'},
];

@inject('RoutingStore', 'UserStore')
@observer
class Log extends Component {

  state = {
    "Id_Users" : [],
    "Id_Subjects" : [],
    "Subjects" : [],
    "DateFrom" : null,
    "DateTo" : null,
    inputValue: '',
    currentPage: 1,
    perPage: 20
  };

  componentWillMount() {
    const { RoutingStore, UserStore } = this.props;
    const { currentUser, list } = UserStore;
    if (currentUser.role_Code !== 'admin') {
      return RoutingStore.push('/');
    }
    this.loadLogs();
    list();
  }

  loadLogs = () => {
    const { logList } = this.props.UserStore;
    const { Id_Users, Id_Subjects, Subjects, DateFrom, DateTo } = this.state;
    const body = {
      "Id_Users": Id_Users.length ? Id_Users.map(v => v.value).join(', ') : null,
      "Id_Subjects" : Id_Subjects.length ? Id_Subjects.map(v => v.value).join(', ') : null,
      "Subjects" : Subjects.length ? Subjects.map(v => v.value).join(', ') : null,
      "DateFrom" : DateFrom ? DateFrom.add(offset, 'minutes').format() : null,
      "DateTo" : DateTo ? DateTo.add(offset, 'minutes').format() : null,
    };
    logList(body);
  };

  changeFilter = (key, value) => {
    this.setState({[key]: value, currentPage: 1}, this.loadLogs);
  };

  onInputChange = (inputValue) => {
    this.setState({ inputValue });
  };

  onKeyDown = (event) => {
    const { inputValue, Id_Subjects } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState({
          inputValue: '',
          Id_Subjects: [...Id_Subjects, {value: inputValue, label: inputValue}],
        }, this.loadLogs);
        event.preventDefault();
    }
  };

  get pagination() {
    const { props, state } = this;
    const { logs } = props.UserStore;
    const { currentPage, perPage } = state;
    if (!logs.length || perPage === 'all') {
      return null;
    }
    const totalPages = Math.ceil(logs.length / perPage);
    return <UltimatePagination currentPage={currentPage} totalPages={totalPages} onChange={currentPage => this.setState({currentPage})} />;
  }

  get perPageComponent() {
    const { props, state } = this;
    const { logs } = props.UserStore;
    const { currentPage, perPage } = state;
    if (!logs.length) {
      return null;
    }
    const attrs = {
      value: perPages.find(item => item.value === perPage),
      isClearable: false,
      isSearchable: false,
      onChange: (v) => this.setState({perPage: v.value, currentPage: 1}),
      className: "hate-select-container",
      menuPlacement: 'top',
      options: perPages
    };
    return (
      <div className="per-page">
        Показывать <Select {...attrs} />
      </div>
    );
  }

  render() {
    const { props, state, changeFilter, onInputChange, onKeyDown, pagination, perPageComponent } = this;
    const { RoutingStore, UserStore } = props;
    const { loading, logs, items } = UserStore;
    const { Id_Users, Subjects, Id_Subjects, inputValue, DateFrom, DateTo, currentPage, perPage } = state;

    const cardAttrs = {
      heading: 'Логи',
      onBack: () => RoutingStore.push('/')
    };

    const headers = [
      {
        field: "id",
        name: "id",
        sortable: true
      },
      {
        field: "fullname",
        name: "имя",
        sortable: true
      },
      {
        field: "role_Name",
        name: "роль",
        sortable: true
      },
      {
        field: "action",
        name: "действие",
        sortable: true
      },
      {
        field: "subject",
        name: "сущность",
        sortable: true
      },
      {
        field: "project_Name",
        name: "проект",
        sortable: true
      },
      {
        field: "client_Name",
        name: "клиент",
        sortable: true
      },
      {
        field: "text",
        name: "изменения",
        sortable: true
      },
      {
        field: "logDate",
        name: "дата",
        sortable: true,
        format: value => formatDate(value, 'DD.MM.YYYY')
      }
    ];

    const userWrapperAttrs = {
      leftPosition: true,
      wrapInput: true,
      icon: <FontAwesomeIcon icon={faUser} className="opacity-half" onClick={(event) => this.userSelect.focus(event)} />
    };

    const userAttrs = {
      className: "hate-select-container",
      classNamePrefix: "hate-select",
      ref: ref => { this.userSelect = ref; },
      value: Id_Users,
      placeholder: "Имя пользователя",
      isClearable: false,
      isSearchable: false,
      isLoading: loading,
      isMulti: true,
      openMenuOnFocus: true,
      onChange: changeFilter.bind(this, 'Id_Users'),
      options: items.map((row) => {
        row.value = row.id_User;
        row.label = row.fullname;
        return row;
      })
    };

    const subWrapperAttrs = {
      leftPosition: true,
      wrapInput: true
    };

    const subAttrs = {
      className: "hate-select-container",
      classNamePrefix: "hate-select",
      value: Subjects,
      placeholder: "Тип сущности",
      isClearable: false,
      isSearchable: false,
      isMulti: true,
      openMenuOnFocus: true,
      onChange: changeFilter.bind(this, 'Subjects'),
      options: subjects
    };

    const idSubWrapperAttrs = {
      leftPosition: true,
      wrapInput: true
    };

    const idSubAttrs = {
      className: "hate-select-container",
      classNamePrefix: "hate-select",
      components: {
        DropdownIndicator: null,
      },
      inputValue,
      menuIsOpen: false,
      value: Id_Subjects,
      placeholder: "ID сущности",
      isClearable: false,
      onInputChange,
      onKeyDown,
      isMulti: true,
      openMenuOnFocus: true,
      onChange: changeFilter.bind(this, 'Id_Subjects'),
    };

    const startAttrs = {
      customInput: <DatepickerCustom customPlaceholder="Дата начала" />,
      selectsStart: true,
      selected: DateFrom,
      startDate: DateFrom,
      endDate: DateTo,
      onChange: changeFilter.bind(this, 'DateFrom')
    };

    const endAttrs = {
      customInput: <DatepickerCustom customPlaceholder="Дата окончания" />,
      selectsEnd: true,
      selected: DateTo,
      startDate: DateFrom,
      endDate: DateTo,
      onChange: changeFilter.bind(this, 'DateTo')
    };

    const filterClassName = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4";

    return (
      <>
        <CardBox {...cardAttrs}>
          <LoaderContainer loading={loading}>
            <div className="row log-filter">
              <div className={filterClassName}>
                <InputGroupWrapper {...userWrapperAttrs}>
                  <Select {...userAttrs} />
                </InputGroupWrapper>
              </div>
              <div className={filterClassName + ' no-icon'}>
                <InputGroupWrapper {...subWrapperAttrs}>
                  <Select {...subAttrs} />
                </InputGroupWrapper>
              </div>
              <div className={filterClassName + ' no-icon'}>
                <InputGroupWrapper {...idSubWrapperAttrs}>
                  <CreatableSelect {...idSubAttrs} />
                </InputGroupWrapper>
              </div>
              <div className={filterClassName}>
                <DatePicker {...startAttrs} />
              </div>
              <div className={filterClassName}>
                <DatePicker {...endAttrs} />
              </div>
            </div>
            <SortableTable headers={headers} items={perPage !== 'all' ? logs.slice(currentPage*perPage - perPage, currentPage*perPage) : logs} />
            <div className="table-footer">
              { pagination }
              { perPageComponent }
            </div>
          </LoaderContainer>
        </CardBox>
      </>
    );
  }
}

export default Log;
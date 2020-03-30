import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CardBox from '@components/common/CardBox';
import InputGroup, {InputGroupWrapper} from '@components/common/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFilter, faCaretDown, faCaretUp, faCheck, faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import {LoaderContainer} from '@components/common/Loader';
import {Collapse} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { Menu, Item, Separator, contextMenu, animation } from 'react-contexify';
import classnames from 'classnames';
import { ConfirmModal } from '@components/common/Modal';
import Select from 'react-select';

const sortOptions = [
  {value: 'name', label: 'Имя', defaultSort: ""},
  {value: 'importance', label: 'Важный', defaultSort: "-"},
  {value: 'recent', label: 'Недавний', defaultSort: "-"},
  {value: 'frequent', label: 'Частый', defaultSort: "-"},
];

@inject('ClientStore', 'UserStore')
class ClientItem extends Component {
  handleContextMenu = (event) => {
    const { item, isOld, UserStore } = this.props;
    const { role_Code } = UserStore.currentUser;
    if (["admin", "boss"].indexOf(role_Code) > -1) {
      // always prevent default behavior
      event.preventDefault();
      const attrs = {
        id: `client_menu${isOld ? '_old' : ''}`,
        event,
        props: item
      };
      contextMenu.show(attrs);
    }
  };
  render() {
    const { props, handleContextMenu } = this;
    const { item, selectedClient, ClientStore} = props;
    const attrs = {
      className: `client-list__item ${selectedClient && item.id_Client === selectedClient.id_Client ? 'client-list__item--active' : ''}`,
      onClick: () => ClientStore.selectClient(item),
      onContextMenu: handleContextMenu
    };
    return (
      <div {...attrs}>
        <div className="client-list__item--in">
          {item.name}
          <FontAwesomeIcon icon={faCheck} className="fa-check" size="xs" />
        </div>
      </div>
    );
  }
}

@inject('UserStore', 'ClientStore', 'AppStore')
@observer
class Clients extends Component {

  state = {
    showOld: false,
    confirmModal: null
  };

  componentDidMount() {
    this.props.ClientStore.listParallel();
  }

  get clients() {
    const { props } = this;
    const { ClientStore } = props;
    const { items, loading, selectedClient } = ClientStore;
    return (
      <LoaderContainer className="client-list" loading={loading}>
        <Scrollbars autoHide autoHideDuration={2000} style={{ minHeight: 50, display: 'flex', flex: '1 0 0%' }}>
          {
            items.map((item) => {
              const attrs = {
                item,
                key: item.id_Client,
                selectedClient
              };
              return <ClientItem {...attrs} />;
            })
          }
        </Scrollbars>
      </LoaderContainer>
    );
  }

  get oldClients() {
    const { props, state } = this;
    const { ClientStore } = props;
    const { showOld } = state;
    const { oldItems, loading, selectedClient } = ClientStore;
    const classes = classnames(
      'old-client-wr',
    );
    return (
      <div className={classes}>
        <div className="old-client-wr__link" onClick={() => this.setState({ showOld: !showOld })}>
          Архив клиентов
          <FontAwesomeIcon icon={showOld ? faCaretUp : faCaretDown} />
        </div>
        <Collapse in={showOld}>
          <div>
            <LoaderContainer className="client-list" loading={loading}>
              <Scrollbars autoHide style={{ maxHeight: 150, display: 'flex', flex: '1 1 150px' }}>
                {
                  oldItems.map((item) => {
                    const attrs = {
                      item,
                      key: item.id_Client,
                      selectedClient,
                      isOld: true
                    };
                    return <ClientItem {...attrs} />;
                  })
                }
              </Scrollbars>
            </LoaderContainer>
          </div>
        </Collapse>
      </div>
    );
  }

  closeClient(isOld, {props}) {
    this.props.ClientStore.close(props.id_Client, isOld);
  }

  removeClient(item) {
    const isOld = this.props.ClientStore._oldItems.some(client => client.id_Client === item.id_Client);
    this.props.ClientStore.remove(item.id_Client, isOld);
    this.toggleConfirm(null);
  }

  createClient(e, name) {
    this.props.ClientStore.create(name);
  }

  filterClient(e) {
    this.props.ClientStore.search = e.target.value;
  }

  toggleConfirm = (value) => {
    this.setState({confirmModal: value ? value.props : value});
  };

  render() {
    const { state, clients, oldClients, createClient, filterClient, closeClient, removeClient, props, toggleConfirm } = this;
    const { ClientStore, UserStore } = props;
    const { confirmModal } = state;
    const { role_Code } = UserStore.currentUser;
    const { sortBy, isReverse } = ClientStore;

    const headerInputAttrs = {
      type: "text",
      placeholder: "Добавить клиента",
      icon: <FontAwesomeIcon className="plus" icon={faPlusCircle} />,
      onSubmit: createClient.bind(this)
    };

    const filterInputAttrs = {
      type: "text",
      placeholder: "Поиск...",
      value: ClientStore.search,
      icon: <FontAwesomeIcon className="filter" icon={faFilter} />,
      onChange: filterClient.bind(this)
    };

    const message = (
      <>
      Удалить клиента <strong>{ confirmModal ? confirmModal.name : '' }</strong>?
      </>
    );

    const isReverseSort = isReverse(sortBy);
    const sortKey = isReverseSort ? sortBy.substring(1) : sortBy;

    const sortWrapperAttrs = {
      leftPosition: true,
      wrapInput: true,
      icon: <FontAwesomeIcon icon={isReverseSort ? faSortAmountDown : faSortAmountUp} className="opacity-half" onClick={e => ClientStore.changeSort()} />
    };

    const sortAttrs = {
      className: "hate-select-container",
      classNamePrefix: "hate-select",
      value: sortOptions.find(o => o.value === sortKey),
      placeholder: "Сортировать",
      isClearable: false,
      isSearchable: false,
      onChange: v => ClientStore.changeSort(`${v.defaultSort}${v.value}`),
      options: sortOptions
    };

    return (
      <>
        <CardBox heading="Клиенты" headingAction={["admin", "boss"].indexOf(role_Code) > -1 ? <InputGroup {...headerInputAttrs} /> : null } >
          <div className="client-filter">
            <InputGroupWrapper {...sortWrapperAttrs}>
              <Select {...sortAttrs}/>
            </InputGroupWrapper>
            <InputGroup {...filterInputAttrs} />
          </div>
          { clients }
          { oldClients }
        </CardBox>
        <Menu id='client_menu' animation={animation.zoom}>
          <Item onClick={closeClient.bind(this, false)}>В архив</Item>
          <Separator />
          <Item onClick={toggleConfirm.bind(this)}>Удалить</Item>
        </Menu>
        <Menu id='client_menu_old' animation={animation.zoom}>
          <Item onClick={closeClient.bind(this, true)}>Восстановить</Item>
          <Separator />
          <Item onClick={toggleConfirm.bind(this)}>Удалить</Item>
        </Menu>
        { confirmModal ? <ConfirmModal show={!!confirmModal} message={message} onSubmit={removeClient.bind(this, confirmModal)} onCancel={toggleConfirm.bind(this, null)} /> : null }
      </>
    );
  }
}

export default Clients;
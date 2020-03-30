import React, { Component } from 'react';
import CardBox from '@components/common/CardBox';
import { ConfirmModal } from '@components/common/Modal';
import { SortableHeader, SortableTable } from '@components/common/Table';
import { observer, inject } from 'mobx-react';
import { Button } from 'react-bootstrap';
import {LoaderContainer} from '@components/common/Loader';
import { Modal } from 'react-bootstrap';
import EditModal from '@components/user/Edit';

@inject('UserStore', 'RoutingStore', 'AppStore')
@observer
class User extends Component {

  state = {
    confirmModal: null
  };

  componentWillMount() {
    const { RoutingStore, UserStore } = this.props;
    const { currentUser, list } = UserStore;
    if (currentUser.role_Code !== 'admin') {
      return RoutingStore.push('/');
    }
    list();
  }

  toggleConfirm = (value) => {
    this.setState({confirmModal: value});
  };

  onDelete = (value) => {
    this.props.UserStore.remove(value.id_User);
    this.toggleConfirm(null);
  };

  render() {
    const { state, props, toggleConfirm, onDelete } = this;
    const { UserStore, AppStore, RoutingStore } = props;
    const { items, loading } = UserStore;
    const { modal, toggleModal } = AppStore;
    const { confirmModal } = state;

    const button = (
      <Button onClick={toggleModal.bind(AppStore, {})} variant="success">
        Новый пользователь
      </Button>
    );

    const cardAttrs = {
      heading: 'Пользователи',
      headingAction: button,
      onBack: () => RoutingStore.push('/')
    };

    const headers = [
      {
        action: 'edit'
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
        field: "username",
        name: "логин",
        sortable: true
      },
      {
        action: 'delete'
      }
    ];

    const message = (
      <>
        Удалить пользователя <strong>{ confirmModal ? confirmModal.fullname : '' }</strong>?
      </>
    );

    return (
      <>
        <CardBox {...cardAttrs}>
          <LoaderContainer loading={loading}>
            <SortableTable headers={headers} items={items} onEdit={toggleModal} onDelete={toggleConfirm} />
          </LoaderContainer>
        </CardBox>
        <Modal show={!!modal} onHide={toggleModal.bind(AppStore, null)} size="sm" centered>
          <EditModal value={modal}/>
        </Modal>
        { confirmModal ? <ConfirmModal show={confirmModal !== null} message={message} onSubmit={onDelete.bind(this, confirmModal)} onCancel={toggleConfirm.bind(this, null)} /> : null }
      </>
    );
  }
}

export default User;
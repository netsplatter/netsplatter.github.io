import React, { Component } from 'react';
import CardBox from '@components/common/CardBox';
import { ConfirmModal } from '@components/common/Modal';
import { SortableHeader, SortableTable } from '@components/common/Table';
import { observer, inject } from 'mobx-react';
import { Button } from 'react-bootstrap';
import {LoaderContainer} from '@components/common/Loader';
import { Modal } from 'react-bootstrap';
import EditModal from '@components/category/Edit';

@inject('ProjectStore', 'RoutingStore', 'AppStore', 'UserStore')
@observer
class Category extends Component {

  state = {
    confirmModal: false
  };

  componentWillMount() {
    const { RoutingStore, UserStore, ProjectStore } = this.props;
    const { currentUser } = UserStore;
    if (["admin", "boss"].indexOf(currentUser.role_Code) === -1) {
      return RoutingStore.push('/');
    }
    ProjectStore.paymentCategoryList();
  }

  toggleConfirm = (item) => {
    this.setState({confirmModal: item});
  };

  onDelete = () => {
    const data = this.state.confirmModal;
    this.setState({confirmModal: false});
  };

  render() {
    const { props, toggleConfirm, onDelete, state } = this;
    const { ProjectStore, AppStore, RoutingStore } = props;
    const { categories, loading } = ProjectStore;
    const { modal, toggleModal } = AppStore;
    const { confirmModal } = state;

    const button = (
      <Button onClick={toggleModal.bind(AppStore, {})} variant="success">
        Новая категория
      </Button>
    );

    const cardAttrs = {
      heading: 'Категории трат',
      headingAction: button,
      onBack: () => RoutingStore.push('/')
    };

    const headers = [
      {
        action: 'edit'
      },
      {
        field: "name",
        name: "название",
        sortable: true
      }
    ];

    const message = (
      <>
        Удалить категорию <strong>{ confirmModal ? confirmModal.name : '' }</strong>?
      </>
    );

    return (
      <>
        <CardBox {...cardAttrs}>
          <LoaderContainer loading={loading}>
            <SortableTable headers={headers} items={categories} onEdit={toggleModal} onDelete={toggleConfirm} />
          </LoaderContainer>
        </CardBox>
        <Modal show={!!modal} onHide={toggleModal.bind(AppStore, null)} size="sm" centered>
          <EditModal value={modal || {}}/>
        </Modal>
        <Modal show={confirmModal !== false} onHide={toggleConfirm.bind(this, false)} size="sm" centered>
          <ConfirmModal message={message} onSubmit={onDelete} onCancel={toggleConfirm.bind(this, false)}/>
        </Modal>
      </>
    );
  }
}

export default Category;
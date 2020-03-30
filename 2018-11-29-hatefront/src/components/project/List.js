import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table } from 'react-bootstrap';
import {LoaderContainer} from '@components/common/Loader';
import {formatDate} from '@utils/Formatter';
import Budget from '@components/project/Budget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Menu, Item, Separator, contextMenu, animation } from 'react-contexify';
import {Collapse} from 'react-bootstrap';
import { ConfirmModal } from '@components/common/Modal';


@inject('ProjectStore', 'AppStore', 'UserStore')
@observer
class Projects extends Component {

  state = {
    showOld: false,
    confirmModal: null
  };

  onView = (item) => {
    this.props.ProjectStore.selectProject(item);
  };

  onEdit = ({props}) => {
    this.props.AppStore.toggleModal(props);
  };

  onClose = (isOld, {props}) => {
    this.props.ProjectStore.close(props.id_Project, isOld);
  };

  onDelete = (item) => {
    const isOld = this.props.ProjectStore.oldItems.some(client => client.id_Project === item.id_Project);
    this.props.ProjectStore.remove(item.id_Project, isOld);
    this.toggleConfirm(null);
  };

  toggleConfirm = (value) => {
    this.setState({confirmModal: value ? value.props : value});
  };

  handleContextMenu = (id, item, event) => {
    const { role_Code } = this.props.UserStore.currentUser;
    if (["admin", "boss"].indexOf(role_Code) > -1) {
      // always prevent default behavior
      event.preventDefault();
      const attrs = {
        id: id,
        event,
        props: item
      };
      contextMenu.show(attrs);
    }
  };

  get tableHeaders () {
    return (
      <thead>
      <tr>
        <th>название проекта</th>
        <th>команда</th>
        <th>дата начала</th>
        <th>дата конца</th>
        <th>бюджет планируемый</th>
        <th>бюджет утвержденный</th>
      </tr>
      </thead>
    );
  };

  tableBody = (items, menuId) => {
    const { onView, handleContextMenu } = this;
    return (
      <tbody>
      {
        items.map((item) => {
          return (
            <tr onContextMenu={handleContextMenu.bind(this, menuId, item)} key={item.id_Project} onClick={onView.bind(this, item)}>
              <td>{item.warning ? <FontAwesomeIcon icon={faExclamationCircle} /> : null}{item.name}</td>
              <td>{item.team.map(row => row.fullname).join(", ")}</td>
              <td>{formatDate(item.dateBegin, 'DD.MM.YYYY')}</td>
              <td>{formatDate(item.dateEnd, 'DD.MM.YYYY')}</td>
              <td><Budget item={item} value={item.budget} /></td>
              <td><Budget item={item} value={item.budgetApproved} colorize /></td>
            </tr>
          );
        })
      }
      </tbody>
    );
  };

  get projects() {
    const { props, tableHeaders, tableBody } = this;
    const { ProjectStore } = props;
    const { items, loading } = ProjectStore;
    return (
      <LoaderContainer className="project-list" loading={loading}>
        <Table hover responsive>
          { tableHeaders }
          { tableBody(items, "project_menu") }
        </Table>
      </LoaderContainer>
    );
  }

  get oldProjects() {
    const { props, state, tableHeaders, tableBody } = this;
    const { showOld } = state;
    const { ProjectStore } = props;
    const { oldItems, loading } = ProjectStore;
    return (
      <div className="old-project-wr">
        <div className="old-project-wr__link" onClick={() => this.setState({ showOld: !showOld })}>
          Архив проектов
          <FontAwesomeIcon icon={showOld ? faCaretUp : faCaretDown} />
        </div>
        <Collapse in={showOld}>
          <div>
            <LoaderContainer className="project-list" loading={loading}>
              <Table hover responsive>
                { tableHeaders }
                { tableBody(oldItems, "project_old_menu") }
              </Table>
            </LoaderContainer>
          </div>
        </Collapse>
      </div>
    );
  }

  render() {
    const { toggleConfirm, projects, oldProjects, onEdit, onClose, state, onDelete } = this;
    const { confirmModal } = state;

    const message = (
      <>
      Удалить проект <strong>{ confirmModal ? confirmModal.name : '' }</strong>?
      </>
    );

    return (
      <>
        { projects }
        { oldProjects }
        <Menu id='project_menu' animation={animation.zoom}>
          <Item onClick={onEdit}>Изменить</Item>
          <Separator />
          <Item onClick={onClose.bind(this, false)}>В архив</Item>
          <Separator />
          <Item onClick={toggleConfirm}>Удалить</Item>
        </Menu>
        <Menu id='project_old_menu' animation={animation.zoom}>
          {/*<Item onClick={onEdit}>Изменить</Item>
          <Separator />*/}
          <Item onClick={onClose.bind(this, true)}>Восстановить</Item>
          <Separator />
          <Item onClick={toggleConfirm}>Удалить</Item>
        </Menu>
        { confirmModal ? <ConfirmModal show={!!confirmModal} message={message} onSubmit={onDelete.bind(this, confirmModal)} onCancel={toggleConfirm.bind(this, null)} /> : null }
      </>
    );
  }
}

export default Projects;
import React, { Component } from 'react';
import Projects from '@components/project/List';
import Payments from '@components/payment/List';
import Project from '@components/project/Item';
import ProjectEdit from '@components/project/Edit';
import PaymentEdit from '@components/payment/Edit';
import CardBox from '@components/common/CardBox';
import { observer, inject } from 'mobx-react';
import { Modal, Button } from 'react-bootstrap';

@inject('ClientStore', 'ProjectStore', 'AppStore', 'UserStore')
@observer
class Home extends Component {

  state = {};

  get content() {
    const { props } = this;
    const { ProjectStore, ClientStore, AppStore, UserStore } = props;
    const { selectedProject } = ProjectStore;
    const { selectedClient } = ClientStore;
    const { toggleModal } = AppStore;
    const { role_Code } = UserStore.currentUser;
    if (!selectedClient) {
      return null;
    }
    if (!selectedProject) {
      const button = (
        <Button onClick={toggleModal.bind(AppStore, {})} variant="success">
          Добавить проект
        </Button>
      );
      const cardAttrs = {
        heading: 'Проекты',
        subheading: selectedClient.name,
        headingAction: ["admin", "boss"].indexOf(role_Code) > -1 ? button : null,
        onBack: null
      };
      return (
        <>
          <CardBox {...cardAttrs}>
            <Projects />
          </CardBox>
        </>
      )
    }

    const button = (
      <Button onClick={toggleModal.bind(AppStore, {})} variant="success">
        Добавить траты
      </Button>
    );

    const cardAttrs = {
      heading: selectedProject.name,
      subheading: selectedClient.name,
      headingAction: selectedProject.frontClosed ? null : button,
      onBack: () => ProjectStore.selectProject()
    };
    return (
      <>
        <CardBox {...cardAttrs}>
          <Project />
        </CardBox>
        <CardBox>
          <Payments />
        </CardBox>
      </>
    );
  }

  render() {
    const { props, content } = this;
    const { ProjectStore, AppStore } = props;
    const { selectedProject } = ProjectStore;
    const { modal, toggleModal } = AppStore;

    return (
      <>
        { content }
        <Modal show={!!modal} onHide={toggleModal.bind(AppStore, null)} size="sm" centered>
          { selectedProject ? <PaymentEdit value={modal || {}} /> : <ProjectEdit value={modal || {}} /> }
        </Modal>
      </>
    );
  }
}

export default Home;
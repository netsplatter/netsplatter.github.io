import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table } from 'react-bootstrap';
import Loader, {LoaderContainer} from '@components/common/Loader';
import Budget from '@components/project/Budget';
import {formatDate} from '@utils/Formatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@inject('ProjectStore')
@observer
class Project extends Component {

  render() {
    const { props } = this;
    const { ProjectStore } = props;
    const { selectedProject, loading } = ProjectStore;

    return (
      <div>
        <Table className="project" responsive>
          <thead>
          <tr>
            <th>дата начала</th>
            <th>дата конца</th>
            <th>бюджет планируемый</th>
            <th>бюджет утвержденный</th>
            <th>команда</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(selectedProject.dateBegin, 'DD.MM.YYYY')}</td>
              <td>{formatDate(selectedProject.dateEnd, 'DD.MM.YYYY')}</td>
              <td><Budget item={selectedProject} value={selectedProject.budget} /></td>
              <td><Budget item={selectedProject} value={selectedProject.budgetApproved} colorize /></td>
              <td><span className="text-overflow">{selectedProject.team.map(row => row.fullname).join(", ")}</span></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Project;
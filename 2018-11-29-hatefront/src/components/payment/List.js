import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Loader, {LoaderContainer} from '@components/common/Loader';
import {formatDate} from '@utils/Formatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import {Dropdown, DropdownButton, Button} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import {toJS} from 'mobx';
import {prettyNumber} from '@utils/Formatter';
import classnames from 'classnames';


@inject('UserStore', 'ProjectStore')
export class Comment extends Component {
  state = {
    comment: '',
    active: false
  };
  onClick = (text) => {
    this.setState({comment: text, active: true}, () => this.input.focus());
  };
  onUpdate = () => {
    const { comment } = this.state;
    const { text, id_Comment } = this.props.value;
    if (comment !== text) {
      this.props.ProjectStore.updateComment(comment, id_Comment)
        .catch(() => {})
        .then(() => {
          this.setState({active: false});
        })
    } else {
      this.setState({active: false});
    }
  };
  render() {
    const { value, className, style, UserStore, ProjectStore } = this.props;
    const { active, comment } = this.state;
    const { dateCreate, owner, text, id_Comment, id_Owner } = value;
    const { role_Code, id } = UserStore.currentUser;
    const classes = classnames(
      'text',
      {
        'active': active,
      },
      className
    );
    return (
      <div className={`comment ${className || ''}`} style={style}>
        <div className="owner">{owner}</div>
        <div className="date">[{formatDate(dateCreate, 'DD.MM.YYYY HH:mm')}]:</div>
        <div className={classes}>
          <span onClick={this.onClick.bind(this, text)} >{text}</span>
          <input type="text"
                 className="form-control"
                 ref={elm => this.input = elm}
                 value={comment}
                 onChange={(e) => this.setState({comment: e.target.value})}
                 onBlur={this.onUpdate}
                 onKeyPress={(e) => {(e.key === 'Enter' ? this.onUpdate() : null)}}/>
        </div>
        {
          ["admin", "boss"].indexOf(role_Code) > -1 && (id_Owner === id || role_Code === 'admin') ? (
            <div className="actions">
              <div className="link" onClick={ProjectStore.deleteComment.bind(ProjectStore, id_Comment)}>Удалить</div>
            </div>
          ) : null
        }
      </div>
    )
  }
}

@inject('ProjectStore', 'UserStore')
@observer
class PaymentRow extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  changePayedStatus(item, event) {
    event.stopPropagation();
    const { props } = this;
    const { ProjectStore } = props;
    const payment = toJS(item);
    payment.frontNewStatus = 7;
    ProjectStore.paymentStatusesUpdate([payment]);
  }
  getStatusOpts(item) {
    const { props } = this;
    const { UserStore } = props;
    const { currentUser } = UserStore;
    const { role_Code } = currentUser;
    const { status_Code } = item;
    let result = {
      className: '',
      component: null,
      checkbox: false
    };
    switch (status_Code) {
      case 'approval':
      case 'prepayed':
      case 'payed':
        result.className = 'success';
        result.component = <FontAwesomeIcon icon={faCheckCircle} />;
        break;
      case 'deleted':
      case 'rejected':
        result.className = 'danger';
        result.component = <FontAwesomeIcon icon={faTimesCircle} />;
        break;
    }
    switch (role_Code) {
      case 'employee':
        if (['rejected', 'approval'].indexOf(status_Code) > -1) {
          result.className = 'warning';
          result.component = <FontAwesomeIcon icon={faExclamationCircle} />;
        }
        break;
      case 'boss':
        if (['notapproval'].indexOf(status_Code) > -1) {
          result.className = 'warning';
          result.component = <FontAwesomeIcon icon={faExclamationCircle} />;
        }
        break;
      case 'accountant':
        if (['approval'].indexOf(status_Code) > -1) {
          result.className = 'warning';
          result.component = <FontAwesomeIcon icon={faExclamationCircle} />;
        } else if (['prepayed'].indexOf(status_Code) > -1) {
          result.component = (
            <DropdownButton className="payed-report-button" id="payed-id" title="Нет" onClick={(e) => e.stopPropagation()}>
              <Dropdown.Item onClick={this.changePayedStatus.bind(this, item)}>Да</Dropdown.Item>
            </DropdownButton>
          );
        } else if (['payed'].indexOf(status_Code) > -1) {
          result.component = (<div>Да</div>)
        }
        break;
    }
    return result;
  };
  changeChecked = (item, event) => {
    item.frontChecked = !item.frontChecked;
  };
  onEdit = (payment) => {
    if (!payment.frontEditable) {
      return false;
    }
    this.props.onEdit(payment);
  };
  render() {
    const { props, changeChecked, onEdit } = this;
    const { item, draft } = props;
    const statusOpts = this.getStatusOpts(item);
    return (
      <div key={item.id_Expense} className={`flex-table__row flex-table__row--${statusOpts.className}`}>
        <div className="flex-table__td flex-table__td--id" onClick={() => onEdit(item)}>{draft ? '-' : item.id_Expense}</div>
        <div className="flex-table__td flex-table__td--name text-overflow" onClick={() => onEdit(item)}>{item.notes}</div>
        <div className="flex-table__td flex-table__td--date" onClick={() => onEdit(item)}>{formatDate(item.dateIssue, 'DD.MM.YYYY')}</div>
        <div className="flex-table__td flex-table__td--cat" onClick={() => onEdit(item)}>{item.category}</div>
        <div className="flex-table__td flex-table__td--type" onClick={() => onEdit(item)}>{!item.type ? 'безнал' : 'наличные'}</div>
        <div className="flex-table__td flex-table__td--rec text-overflow" onClick={() => onEdit(item)}>{item.recipient}</div>
        <div className="flex-table__td flex-table__td--sum" onClick={() => onEdit(item)}>{prettyNumber(item.amount)}</div>
        <div className="flex-table__td flex-table__td--status" onClick={() => onEdit(item)}>{statusOpts.component}</div>
        <div className="flex-table__td flex-table__td--check">
          {item.frontStatusEditable ? <div>
            <input type="checkbox" id={item.id_Expense} checked={item.frontChecked || false} onChange={changeChecked.bind(this, item)} />
            <label htmlFor={item.id_Expense}>
                <FontAwesomeIcon icon={faCheck} />
            </label>
          </div> : null}
        </div>
      </div>
    )
  }
}

@inject('ProjectStore', 'UserStore', 'AppStore')
@observer
export default class Payments extends Component {
  state = {
    checkAll: false,
    comment: ''
  };
  changeCheckAll = () => {
    const { state, props } = this;
    const { checkAll } = state;
    const { ProjectStore } = props;
    const { payments } = ProjectStore;
    const newValue = !checkAll;
    payments.forEach(payment => {
      if (payment.frontStatusEditable) {
        payment.frontChecked = newValue;
      }
    });
    this.setState({checkAll: newValue});
  };
  changeStatus = (status) => {
    const { ProjectStore } = this.props;
    const { payments } = ProjectStore;
    const req = toJS(payments.filter(payment => payment.frontChecked));
    if (!req.length) {
      return false;
    }
    req.forEach(payment => {
      payment.frontNewStatus = status;
    });
    ProjectStore.paymentStatusesUpdate(req);
  };
  onComment = () => {
    const text = this.state.comment;
    if (!text) {
      return false;
    }
    this.props.ProjectStore.updateComment(text)
      .then(() => {
        this.setState({comment: ''});
      })
      .catch(() => {});
  };
  get paymentButtons() {
    const { currentUser } = this.props.UserStore;
    const { payments, loading } = this.props.ProjectStore;
    const { role_Code } = currentUser;
    let component = null;
    const disabled = payments.every(p => !p.frontChecked) || loading;
    switch (role_Code) {
      case "accountant":
        component = <Button variant="success" disabled={disabled} onClick={this.changeStatus.bind(this, 6)}>Выдать деньги</Button>;
        break;
      case "boss":
        component = (
          <>
            <Button variant="success" disabled={disabled} onClick={this.changeStatus.bind(this, 5)}>Подтвердить отмеченные</Button>
            <Button variant="danger" disabled={disabled} onClick={this.changeStatus.bind(this, 8)}>Отклонить отмеченные</Button>
          </>
        );
        break;
      case "admin":
      case "employee":
        component = (
          <>
            <Button variant="success" disabled={disabled} onClick={this.changeStatus.bind(this, 3)}>Отправить отмеченные</Button>
            <Button variant="danger" disabled={disabled} onClick={this.changeStatus.bind(this, 4)}>Удалить отмеченные</Button>
          </>
        );
        break;
    }
    return component;
  }
  render() {
    const { props, state, paymentButtons, onComment, changeCheckAll } = this;
    const { checkAll, comment } = state;
    const { ProjectStore, AppStore, UserStore } = props;
    const { loading, payments, comments } = ProjectStore;
    const { toggleModal } = AppStore;
    const { role_Code } = UserStore.currentUser;
    const noDrafts = [];
    const drafts = [];
    payments.forEach(item => {
      if (item.status_Code === 'draft') {
        drafts.push(item);
      } else {
        noDrafts.push(item);
      }
    });
    return (
      <div className="payment-list-wr">
        <LoaderContainer loading={loading} className="payment-list">
          <div className="table-responsive">
            <div className="flex-table main">
              <div className="flex-table__row flex-table__header">
                <div className="flex-table__th flex-table__td--id">ID</div>
                <div className="flex-table__th flex-table__td--name">название</div>
                <div className="flex-table__th flex-table__td--date">когда выдать</div>
                <div className="flex-table__th flex-table__td--cat">категория</div>
                <div className="flex-table__th flex-table__td--type">тип</div>
                <div className="flex-table__th flex-table__td--rec">кому</div>
                <div className="flex-table__th flex-table__td--sum">сумма</div>
                <div className="flex-table__th flex-table__td--status">статус</div>
                <div className="flex-table__th flex-table__td--check">
                    {payments.some(item => item.frontStatusEditable) ? <div>
                        <input type="checkbox" id="checkAll" checked={checkAll} onChange={changeCheckAll} />
                        <label htmlFor="checkAll">
                            <FontAwesomeIcon icon={faCheck} />
                        </label>
                    </div> : null}
                </div>
              </div>
              {
                noDrafts.map((item) => <PaymentRow key={item.id_Expense} item={item} onEdit={toggleModal} />)
              }
            </div>
            <div className="flex-table drafts">
              {
                drafts.map((item) => <PaymentRow key={item.id_Expense} item={item} draft onEdit={toggleModal} />)
              }
            </div>
          </div>
        </LoaderContainer>
        <div className="payment-actions-wr">
          <div className="project-comments-wr">
            { ["admin", "boss"].indexOf(role_Code) > -1 ? (
              <div className="project-comments-submit">
                <textarea placeholder="Комментарии к проекту" value={comment} onChange={(e) => this.setState({comment: e.target.value})} onKeyPress={(e) => {(e.key === 'Enter' ? onComment() : null)}} className="form-control" />
              </div>
            ) : null }
            { comments.length ? (
              <Scrollbars autoHide autoHideDuration={2000} style={{ minHeight: 50 }} autoHeight
                          autoHeightMin={0}
                          autoHeightMax={100}>
                <LoaderContainer loading={loading} className="project-comments">
                  { comments.map(item => <Comment key={item.id_Comment} value={item} />) }
                </LoaderContainer>
              </Scrollbars>
            ) : null }
          </div>
          <div className="payment-actions">
            { paymentButtons }
          </div>
        </div>
      </div>
    );
  }
}
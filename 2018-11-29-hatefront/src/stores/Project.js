import { action, set, observable, computed } from 'mobx';
import AbstractStore from '@stores/Abstract';
import UserStore from '@stores/User';
import AppStore from '@stores/App';
import {errorHandler} from '@utils/Api';
import moment from 'moment';
const offset = moment().utcOffset();

class ProjectStore extends AbstractStore {

  @observable items = [];
  @observable oldItems = [];
  @observable payments = [];
  @observable categories = [];
  @observable comments = [];
  @observable selectedProject = undefined;
  @observable selectedClient = undefined;

  constructor(...args) {
    super(...args);
  }

  listParallel = async (client) => {
    this.loading = true;
    try {
      await Promise.all([
        this.list(client, false, true),
        this.list(client, true, true)
      ])
    } catch(e) {}
    this.loading = false;
  };

  list = async (client, closed, silent) => {
    const { get } = this;
    const url = `/projects?client=${client.id_Client}&closed=${closed ? 'yes' : 'no'}`;

    const key = closed ? 'oldItems' : 'items';
    const abortName = closed ? 'project_list2' : 'project_list';
    try {
      const res = await get({url, silent, abortName});
      this[key] = res.body.data.map(item => {
        item.frontClosed = closed;
        return item;
      });
    } catch (e) {
      errorHandler.call(this, {showToast: true}, e);
      if (e && !e.abort) {
        this[key] = [];
      }
    }
  };

  canUserChangePaymentStatus = (payment) => {
    const { currentUser } = UserStore;
    const { role_Code, id } = currentUser;
    const { status_Code, id_Recipient } = payment;
    if (this.selectedProject.frontClosed) {
      return false;
    }
    if (id !== id_Recipient && ['employee'].indexOf(role_Code) > -1) {
      return false;
    }
    return (
      ['employee', 'admin'].indexOf(role_Code) > -1 && ['rejected', 'saved'].indexOf(status_Code) > -1 ||
      role_Code === 'boss' && ['notapproval'].indexOf(status_Code) > -1 ||
      role_Code === 'accountant' && ['approval'].indexOf(status_Code) > -1
    );
  };

  canUserEditPayment = (payment) => {
    const { currentUser } = UserStore;
    const { role_Code, id } = currentUser;
    const { status_Code, id_Recipient } = payment;
    if (this.selectedProject.frontClosed) {
      return false;
    }
    if (id !== id_Recipient && ['admin', 'boss'].indexOf(role_Code) === -1) {
      return false;
    }
    return ['admin', 'employee', 'boss'].indexOf(role_Code) > -1 &&  ['rejected', 'draft', 'saved'].indexOf(status_Code) > -1;
  };

  paymentCategoryList = async () => {
    const { get } = this;
    const url = `/categories?closed=no`;
    try {
      const res = await get({url});
      this.categories = res.body.data;
    } catch (e) {
      errorHandler.call(this, {showToast: true, message: 'Ошибка загрузки списка статусов'}, e);
    }
  };

  paymentList = async () => {
    const { get } = this;
    const url = `/expenses?project=${this.selectedProject.id_Project}`;

    try {
      const res = await get({url, abortName: 'payment_list'});
      this.payments = res.body.data.map(payment => {
        payment.frontEditable = this.canUserEditPayment(payment);
        payment.frontStatusEditable = this.canUserChangePaymentStatus(payment);
        payment.frontChecked = false;
        return payment;
      });
    } catch (e) {
      errorHandler.call(this, {showToast: true}, e);
      if (e && !e.abort) {
        this.payments = [];
      }
    }
  };

  paymentStatusesUpdate = async (payments) => {
    const { post, selectedProject } = this;
    const url = `/expense/set_status`;

    try {
      await Promise.all(payments.map(async (item) => {
        const body = {
          "Id_Project": selectedProject.id_Project,
          "Id_Expense": item.id_Expense,
          "Id_Status": item.frontNewStatus
        };
        try {
          await post({url, body});
        } catch (e) {
          errorHandler.call(this, {showToast: true}, e);
        }
      }));
      await this.paymentList();
    } catch(e) {}
  };

  update = async (project) => {
    const { post } = this;
    const url = `/project/save`;
    const {name, budget, dateBegin, dateEnd, id_Project, team} = project;
    const body = {
      id_Client: this.selectedClient.id_Client,
      id_Project: id_Project || 0,
      name,
      budget,
      dateBegin: dateBegin ? dateBegin.add(offset, 'minutes').format() : null,
      dateEnd: dateEnd ? dateEnd.add(offset, 'minutes').format() : null,
      members: team.map(item => item.value).join(", ")
    };
    this.loading = true;
    try {
      await post({url, body, silent: true});
      AppStore.toggleModal(null);
      await this.list(this.selectedClient, project.frontClosed);
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  updatePayment = async (payment) => {
    const { post } = this;
    const url = `/expense/save`;
    const {notes, amount, dateIssue, type, id_Expense, id_Category} = payment;
    const body = {
      id_Client: this.selectedClient.id_Client,
      id_Project: this.selectedProject.id_Project,
      id_Expense,
      notes,
      amount,
      dateIssue: dateIssue ? dateIssue.add(offset, 'minutes').format() : null,
      type,
      id_Category
    };
    this.loading = true;
    try {
      await post({url, body, silent: true});
      AppStore.toggleModal(null);
      await this.paymentList();
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  updatePaymentCategory = async (body) => {
    const { post } = this;
    const url = `/category/save`;
    this.loading = true;
    try {
      await post({url, body, silent: true});
      AppStore.toggleModal(null);
      await this.paymentCategoryList();
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  close = async (id, isOld) => {
    const { get } = this;
    const url = `/project/close?project=${id}&closed=${isOld ? 'no' : 'yes'}`;
    this.loading = true;
    try {
      await get({url, silent: true});
      await this.listParallel(this.selectedClient);
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  remove = async (id, isOld) => {
    const { get } = this;
    const url = `/project/drop?project=${id}`;
    this.loading = true;
    try {
      await get({url, silent: true});
      await this.list(this.selectedClient, isOld);
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  commentList = async () => {
    const { get } = this;
    const url = `/comments?project=${this.selectedProject.id_Project}`;
    try {
      const res = await get({url, abortName: 'project_comments'});
      this.comments = res.body.data;
    } catch (e) {
      errorHandler.call(this, {showToast: true}, e);
    }
  };

  updateComment = async (text, id_Comment) => {
    const { post } = this;
    const url = `/comment/save`;
    const body = {
      id_Project: this.selectedProject.id_Project,
      id_Comment,
      text
    };
    this.loading = true;
    try {
      await post({url, body, silent: true});
      await this.commentList();
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
      throw e;
    }
  };

  deleteComment = async (id_Comment) => {
    const { post } = this;
    const url = `/comment/drop`;
    const body = {
      id_Project: this.selectedProject.id_Project,
      id_Comment
    };
    this.loading = true;
    try {
      await post({url, body, silent: true});
      await this.commentList();
    } catch (e) {
      errorHandler.call(this, {showToast: true, stopLoading: true}, e);
    }
  };

  selectProject(item) {
    if (item && this.selectedProject && this.selectedProject.id_Project === item.id_Project) {
      return false;
    }
    this.selectedProject = item;
    if (this.selectedProject) {
      this.paymentList();
      this.commentList();
    }
  }

  selectClient(item) {
    this.selectedProject = undefined;
    this.selectedClient = item;
    this.payments = [];
    this.comments = [];
    if (item) {
      this.abort('payment_list');
      this.listParallel(item);
    } else {
      this.items = [];
      this.oldItems = [];
    }
  }

}

export default new ProjectStore();
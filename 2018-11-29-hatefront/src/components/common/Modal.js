import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export class ConfirmModal extends Component {
  render() {
    const { props } = this;
    const { show, message, confirmText, declineText, onSubmit, onCancel } = props;

    return (
      <Modal show={show} onHide={onCancel} size="sm" centered>
        <Modal.Body className="modal-confirm">
          <div className="msg">
            { message }
          </div>
          <div className="actions">
            <Button variant="danger" size="sm" onClick={onCancel}>{ declineText || 'Отмена' }</Button>
            <Button variant="success" size="sm" onClick={onSubmit}> { confirmText || 'Ок' }</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
import React from 'react';
import Modal from 'react-bootstrap/Modal';

function DialogBox({ essay, isOpen, onClose }) {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Essay is Ready!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{essay}</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default DialogBox;

import React from 'react';
import '../css/Modal.css';
import Button from './Button';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <Button onClick={onClose} text="Fechar" type="primary"/>
      </div>
    </div>
  );
};

export default Modal;

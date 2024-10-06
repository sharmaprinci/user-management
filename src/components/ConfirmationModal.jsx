
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Confirmation</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className='delete-buttons'>
        <button className='delete' onClick={onConfirm}>Yes, Delete</button>
        <button className='cancel' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

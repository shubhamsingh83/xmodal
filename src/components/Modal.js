import React from "react";
import Form from "./Form";
import "../styles/Modal.css";

function Modal({ onClose ,handleUpdateUser, userId, isEditMode}) {
  return (
    <div onClick={onClose} className="popup-box modal">
      <div onClick={(e) => e.stopPropagation()} className="box">
        <h1>Fill Details</h1>
        {userId}
        <div className="modal-content">
          <Form onClose={onClose}  handleUpdateUser={handleUpdateUser}  userId={userId}  isEditMode={isEditMode}/>
        </div>
      </div>
    </div>
  );
}

export default Modal;

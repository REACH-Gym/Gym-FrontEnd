import React from "react";
import "./Modal.css";
function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="bg-light modalContent">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
export default Modal;

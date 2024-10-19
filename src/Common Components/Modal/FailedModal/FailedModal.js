import React from "react";
import "../Modal.css";
function FailedModal({ isOpen, text, children, handleClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modalContent modal-width" id="modal-width">
          <div className="d-flex justify-content-start">
            <button className="border-0 pt-3 ps-3 pe-3 failed fw-bolder" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="text-center">
            <img
              src="/assets/image/material-symbols_sms-failed-outline-rounded.png"
              alt=""
              width={"100px"}
              height={"100px"}
              style={{ padding: "12px" }}
            />
          </div>
          <div>
            <p>{children}</p>
          </div>
        </div>
    </div>
  );
}
export default FailedModal;

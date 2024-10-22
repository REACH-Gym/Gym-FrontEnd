import React from "react";
import "../Modal.css";
function SuccessModal({ isOpen, text, children, handleClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modalContent modal-width" id="modal-width">
      <div className="d-flex justify-content-start">
            <button className="border-0 pt-3 ps-3 pe-3 failed fw-bolder" onClick={handleClose}>
              X
            </button>
          </div>
        <div>
          <div className="text-center">
            <img
              src="/assets/image/weui_done2-outlined.png"
              alt=""
              width={"110px"}
              height={"110px"}
              style={{ padding: "10px" }}
            />
          </div>
          <div>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SuccessModal;
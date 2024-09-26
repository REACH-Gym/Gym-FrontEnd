import React from "react";
import "./logout.css";
function ModalLogOut({children , isOpen}) {
  return (
    <div className="modalOverlay">
      <div className="modalContents">
        <div className="modalcontent">{children}</div>
      </div>
    </div>
  );
}
export default ModalLogOut;

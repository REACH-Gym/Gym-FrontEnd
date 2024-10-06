import React from "react";
import "./mainButton.css";
function MainButton({
  text,
  onClick,
  btnWidth = "",
  btnType,
  disabled = false,
}) {
  return (
    <div>
      <button
        className="main-button"
        style={{ width: btnWidth }}
        onClick={onClick}
        type={btnType}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default MainButton;

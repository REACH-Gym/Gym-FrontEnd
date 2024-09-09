import React from "react";
import "./mainButton.css";
function MainButton({ text, onClick, btnWidth, btnType }) {
  return (
    <div>
      <button className="main-button" onClick={onClick} type={btnType}>
        {text}
      </button>
    </div>
  );
}

export default MainButton;

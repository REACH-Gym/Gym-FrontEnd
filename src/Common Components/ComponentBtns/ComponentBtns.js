import React from "react";
import MainButton from "../Main Button/MainButton";
import "./ComponentBtns.css";
function ComponentBtns({ btn1, onclick, disabled = true }) {
  return (
    <div className="d-flex">
      {/* <div className={`buttons ms-3 disabled`}>
        <MainButton btnWidth={"170px"} text={btn1} onClick={onclick} disabled={true} />
      </div> */}
      <div className={`buttons`}>
        <MainButton
          text={"تصدير إلى إكسل"}
          onClick={onclick}
          btnWidth={"170px"}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default ComponentBtns;

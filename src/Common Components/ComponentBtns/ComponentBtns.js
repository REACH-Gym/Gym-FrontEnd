import React from "react";
import MainButton from "../Main Button/MainButton";
import './ComponentBtns.css';
function ComponentBtns({btn1 , onclick , disabled}) {
  return (
    <div className="d-flex">
      {/* <div className={`buttons ms-3 disabled`}>
        <MainButton btnWidth={"170px"} text={btn1} onClick={onclick} disabled={true} />
      </div> */}
      <div className={`buttons disabled`}>
        <MainButton text={"تصدير إلى إكسل"} btnWidth={"170px"} />
      </div>
    </div>
  );
}

export default ComponentBtns;

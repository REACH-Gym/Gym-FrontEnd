import React from "react";
import './ComponentTitle.css'
function ComponentTitle({ title, subTitle, date = false, MainIcon }) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="ComponentTitleContainer">
      <div className="d-flex align-items-center">
        <div className="mainIcon">
          <img src={MainIcon} alt="icon" />
        </div>
        <div>
          <div className="d-flex mt-3 me-3">
            <p className="fw-bolder mb-0">{title}</p>
            {date ? (
              <p className="mb-0">
                <span className="text-muted me-2 fw-lighter" style={{fontSize:"15px" , color:"#666666"}}>
                  {formattedDate}
                </span>
              </p>
            ) : null}
          </div>
          <p className="fw-lighter me-3" style={{fontSize:"14px" , color:"#666666"}}>{subTitle}</p>
        </div>
      </div>
    </div>
  );
}

export default ComponentTitle;

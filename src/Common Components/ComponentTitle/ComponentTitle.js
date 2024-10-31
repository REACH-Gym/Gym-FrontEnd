import React from "react";
import './ComponentTitle.css';

function ComponentTitle({ title, subTitle, date = false, isSVG = false, MainIcon }) {
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
          {isSVG ? (
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={MainIcon} stroke="#006AEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <img src={MainIcon} alt="icon" />
          )}
        </div>
        <div>
          <div className="d-flex mt-3 me-3">
            <p className="fw-bolder mb-0 text-light">{title}</p>
            {date && (
              <p className="mb-0">
                <span className=" me-2 fw-lighter text-secondary" style={{fontSize:"15px", color:"#fff"}}>
                  {formattedDate}
                </span>
              </p>
            )}
          </div>
          <p className="fw-lighter me-3" style={{fontSize:"14px", color:"#fff"}}>{subTitle}</p>
        </div>
      </div>
    </div>
  );
}

export default ComponentTitle;

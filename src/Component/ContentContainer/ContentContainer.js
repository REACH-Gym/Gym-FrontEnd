import styles from "./ContentContainer.module.css";
import { Outlet } from "react-router-dom";
import MainButton from "../../Common Components/Main Button/MainButton";
import { useEffect, useState } from "react";

const ContentContainer = ({ title, desc, search, btn1, btn2, mainIcon }) => {
  const currentDate = new Date();
  const [disabled, setDisabled] = useState("false");
  useEffect(() => {
    if (btn2 === "disabled") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [btn2]);
  const formattedDate = currentDate.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="ms-3 mb-3 bg-light p-2 rounded">
            <img
              src={mainIcon}
              alt="home logo"
              width={"23px"}
              height={"21.36"}
            />
          </div>
          <div>
            <p className="mb-0">
              {title}{" "}
              <span className="text-muted me-2 text-secondary fs-6 fw-lighterss">
                {formattedDate}
              </span>
            </p>
            <p className="fw-lighter">{desc}</p>
          </div>
        </div>
        {search ? (
          <div className={`search`}>
            <form className="d-flex justify-content-between">
              <input
                type="text"
                id="search"
                placeholder="ابحث هنا"
                className={`${styles.searchInput} ms-2`}
              />
              <MainButton text={"بحث"} btnWidth={"60px"} />
            </form>
          </div>
        ) : null}
        {btn1 || btn2 ? (
          <div className="d-flex">
            {btn1 ? (
              <div className={`buttons ms-3`}>
                <MainButton text={btn1} btnWidth={"170px"} />
              </div>
            ) : null}
            {btn2 ? (
              <div className={`buttons`}>
                <MainButton
                  text={"تصدير إلى إكسل"}
                  btnWidth={"170px"}
                  disabled={disabled}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className={`content`}>
        <Outlet />
      </div>
    </div>
  );
};
export default ContentContainer;

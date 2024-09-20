import styles from "./ContentContainer.module.css";
import MainButton from "../../Common Components/Main Button/MainButton";
import { useEffect, useState } from "react";

const ContentContainer = ({
  children,
  title,
  desc,
  search,
  btn1,
  btn2,
  // mainIcon,
  date = false,
  btn1Onclick
}) => {
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
    <div className={`${styles.contentContainer}`}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="ms-3 mb-3 p-2 rounded main-icon">
            {/* <img src={mainIcon} alt="Icon" width={"20px"} height={"19.36"} /> */}
          </div>
          <div>
          {title}{" "}
            {date ? <p className="mb-0">
              <span className="text-muted me-2 text-secondary fs-6 fw-lighter">
                {formattedDate}
              </span>
            </p>: null}
            
            <p className="fw-lighter" style={{fontSize:"14px", color:"gray"}}>{desc}</p>
          </div>
        </div>
        {search ? (
          <div className={`search`}>
            <form className={`${styles.form} d-flex justify-content-between`}>
              <input
                type="text"
                id="search"
                placeholder="ابحث هنا"
                className={`${styles.searchInput} ms-2`}
              />
              <MainButton text={"بحث"} btnWidth={"100px"} />
            </form>
          </div>
        ) : null}
        {btn1 || btn2 ? (
          <div className="d-flex">
            {btn1 ? (
              <div className={`${styles.buttons} ms-3`}>
                <MainButton text={btn1} onClick={btn1Onclick} btnWidth={"170px"} />
              </div>
            ) : null}
            {btn2 ? (
              <div className={`${styles.buttons}`}>
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
      <div className={`content`} >{children}</div>
    </div>
  );
};
export default ContentContainer;

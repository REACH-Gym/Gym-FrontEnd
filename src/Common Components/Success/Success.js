import { useEffect, useState } from "react";
import styles from "./Success.module.css";

const Success = ({ text, show }) => {
  const [warn, setWarn] = useState(show);
  useEffect(() => {
    setWarn(!show);
  }, [show]);
  if (warn) {
    return null;
  }
  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.success}`}>
        <span onClick={() => setWarn(false)}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8014 1.67737L13.3318 0.208618L7.50569 6.03154L1.67953 0.208618L0.209961 1.67737L6.03612 7.50029L0.209961 13.3232L1.67953 14.792L7.50569 8.96904L13.3318 14.792L14.8014 13.3232L8.97525 7.50029L14.8014 1.67737Z"
              fill="#232323"
            />
          </svg>
        </span>
        <svg
          width="86"
          height="86"
          viewBox="0 0 86 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M43 85.5C19.5273 85.5 0.5 66.4727 0.5 43C0.5 19.5273 19.5273 0.5 43 0.5C66.4727 0.5 85.5 19.5273 85.5 43C85.5 66.4727 66.4727 85.5 43 85.5ZM43 80.4C52.9191 80.4 62.4319 76.4597 69.4458 69.4458C76.4597 62.4319 80.4 52.9191 80.4 43C80.4 33.0809 76.4597 23.5681 69.4458 16.5542C62.4319 9.54034 52.9191 5.6 43 5.6C33.0809 5.6 23.5681 9.54034 16.5542 16.5542C9.54034 23.5681 5.6 33.0809 5.6 43C5.6 52.9191 9.54034 62.4319 16.5542 69.4458C23.5681 76.4597 33.0809 80.4 43 80.4ZM38.019 53.8715L62.7072 29.1875L66.3112 32.7957L41.0238 58.0832C40.2268 58.88 39.1459 59.3276 38.019 59.3276C36.8921 59.3276 35.8112 58.88 35.0143 58.0832L21.75 44.8105L25.3582 41.2022L38.0233 53.8673L38.019 53.8715Z"
            fill="#006AEA"
          />
        </svg>
        <p className="mt-4 fs-5 fw-bold">{text}</p>
      </div>
    </>
  );
};

export default Success;

import styles from "./MainBtn.module.css";

// Main Btn Component (Blue)
// props: text, onClick(fn), btnWidth, btnType
const MainBtn = ({ text, onClick, btnWidth, btnType }) => {
  return (
    <button
      className={`${styles.mainBtn}`}
      style={{ width: `${btnWidth}` }}
      onClick={onClick}
      type={btnType}
    >
      {text}
    </button>
  );
};

export default MainBtn;

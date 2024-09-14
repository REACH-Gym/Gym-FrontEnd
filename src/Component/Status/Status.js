import styles from "./Status.module.css";

export const ConfirmedStatus = () => {
  return <div className={`${styles.confirmedStatus}`}>مؤكد</div>;
};
export const NotConfirmedStatus = () => {
  return <div className={`${styles.notConfirmedStatus}`}>غير مؤكد</div>;
};
export const CloseToFiniteStatus = () => {
  return (
    <div className={`${styles.closeToFiniteStatus}`}>أوشك على الإنتهاء</div>
  );
};

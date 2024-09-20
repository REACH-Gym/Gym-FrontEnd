import styles from "./Status.module.css";

export const Active = () => {
  return <div className={`${styles.confirmedStatus}`}>نشط</div>;
};
export const Freezed = () => {
  return <div className={`${styles.notConfirmedStatus}`}>مجمد</div>;
};
export const Expired = () => {
  return <div className={`${styles.closeToFiniteStatus}`}>منتهي</div>;
};
export const Cancled = () => {
  return <div className={`${styles.closeToFiniteStatus}`}>تم إلغائه</div>;
};

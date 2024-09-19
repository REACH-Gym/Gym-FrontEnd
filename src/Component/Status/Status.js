import styles from "./Status.module.css";

export const Active = () => {
  return <div className={`${styles.confirmedStatus}`}>فعال</div>;
};
export const Expired = () => {
  return <div className={`${styles.notConfirmedStatus}`}>منتهي</div>;
};
export const Cancled = () => {
  return <div className={`${styles.closeToFiniteStatus}`}>ملغي</div>;
};

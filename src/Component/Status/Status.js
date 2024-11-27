import styles from "./Status.module.css";
export const Active = () => {
  return <div className={`${styles.confirmedStatus}`}>فعال</div>;
};
export const Accepted = () => {
  return <div className={`${styles.confirmedStatus}`}>مقبول</div>;
};
export const Expired = () => {
  return <div className={`${styles.notConfirmedStatus}`}>منتهي</div>;
};
export const Rejected = () => {
  return <div className={`${styles.notConfirmedStatus}`}>مرفوض</div>;
};
export const Deleted = () => {
  return <div className={`${styles.notConfirmedStatus}`}>محذوف</div>;
};
export const AlmostOver = () => {
  return (
    <div className={`${styles.closeToFiniteStatus}`}>أوشك علي الأنتهاء</div>
  );
};
export const Freezed = () => {
  return <div className={`${styles.freezedStatus}`}> متجمد </div>;
};

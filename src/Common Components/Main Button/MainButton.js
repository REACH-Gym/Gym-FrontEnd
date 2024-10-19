import React, { useEffect, useState } from "react";
import "./mainButton.css";
// import { OrbitProgress } from "react-loading-indicators";
function MainButton({
  text,
  onClick,
  btnWidth = "",
  btnType,
  disabled = false,
  isLoading = false,
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  return (
    <div>
      <button
        className="main-button"
        style={{ width: btnWidth }}
        onClick={onClick}
        type={btnType}
        disabled={disabled || loading}
      >
        {/* {loading  ? <OrbitProgress color="#fff" size="small" width="4px" height="4px"/> : text } */}
        {loading  ? "جاري التحميل .." : text }
      </button>
    </div>
  );
}

export default MainButton;

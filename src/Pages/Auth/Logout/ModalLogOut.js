import React from "react";
import "./logout.css";

function ModalLogOut({ children, isOpen, onClose }) {
  if (!isOpen) return null; // Ensure modal is rendered only when `isOpen` is true

  return (
    <div
      className="modalOverlay"
      onClick={onClose} // Close modal when clicking outside the modal content
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="modalContents"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          position: "relative",
          maxWidth: "500px",
          width: "80%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalLogOut;

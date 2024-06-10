import React from "react";

// används inte, används i CompanyModal
export default function Backdrop({ children, closeFunction }) {
  const handleCloseModal = (event) => {
    if (
      event.target.className.includes("backdrop") ||
      event.target.className.includes("modal")
    ) {
      closeFunction();
    }
  };
  return (
    <div className="backdrop" onClick={handleCloseModal}>
      {children}
    </div>
  );
}

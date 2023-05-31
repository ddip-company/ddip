import React from "react";
import { createPortal } from "react-dom";
import "./modal.css";

function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  const clickBackdropHandler = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="modalBackdrop" onClick={clickBackdropHandler}>
      <div className="modalContents">{children}</div>
    </div>,
    document.body
  );
}

export default Modal;

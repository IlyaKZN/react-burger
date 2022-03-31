import React, { FC } from "react";
import overlayStyles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClose: (() => void) | undefined;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {

  return (
    <div className={overlayStyles.modalOverlay} onClick={onClose}></div>
  )
}


export default ModalOverlay
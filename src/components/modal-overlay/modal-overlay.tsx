import React, { FC } from "react";
import overlayStyles from "./modal-overlay.module.css";
import { MouseEventHandler } from "react";

interface IModalOverlayProps {
  onClose: (() => void);
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  
  return (
    <div className={overlayStyles.modalOverlay} onClick={onClose}></div>
  )
}


export default ModalOverlay
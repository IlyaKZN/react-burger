import React, { FC } from "react";
import modalHeaderStyles from "./modal-header.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalHeaderProps {
  onClose: (() => void) | undefined;
}

const ModalHeader: FC<IModalHeaderProps> = ({ onClose, children }) => {
  return (
    <div className={modalHeaderStyles.header}>
      <h3 className="text text_type_main-large">{children}</h3>
      <div className={modalHeaderStyles.closeButton}>
        <CloseIcon type="primary" onClick={onClose}/>
      </div>
    </div>
  )
}

export default ModalHeader;
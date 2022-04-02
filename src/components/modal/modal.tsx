import React, { FC, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import ModalHeader from "../modal-header/modal-header";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch } from "react-redux";
import { DELETE_ORDER_DATA } from "../../services/actions";
import { useHistory } from "react-router";
const modalRoot = document.getElementById("react-modals");

interface IModalProps {
  typeModal: string;
  header?: string;
  closeModal: (() => void)
}

const Modal: FC<IModalProps> = ({ typeModal, header = "", children, closeModal }) => {

  React.useEffect(() => {
    document.addEventListener("keydown", checkButton);

    return () => {
      document.removeEventListener("keydown", checkButton);
    };
  }, []);

  const checkButton = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <ModalHeader onClose={closeModal}>{header}</ModalHeader>
        {children}
      </div>
      <ModalOverlay onClose={closeModal} />
    </>,
    modalRoot as Element
  );
};

export default Modal;

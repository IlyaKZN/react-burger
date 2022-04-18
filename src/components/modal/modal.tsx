import React, { FC, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useParams } from "react-router";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalRoot = document.getElementById("react-modals");

interface IModalProps {
  header?: string;
  closeModal: (() => void);
  headerType: 'digits' | 'text';
}

const Modal: FC<IModalProps> = ({ header, children, closeModal, headerType }) => {

  const params: {number: string} = useParams();

  if (header === undefined) {
    header = `#${params.number}`;
  }

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
        <div className={modalStyles.header}>
          {headerType === 'text' ? <h3 className="text text_type_main-large">{header}</h3> :
            <h3 className="text text_type_digits-default">{header}</h3>
            }
        <div className={modalStyles.closeButton}>
          <CloseIcon type="primary" onClick={closeModal}/>
        </div>
      </div>
        {children}
      </div>
      <ModalOverlay onClose={closeModal} />
    </>,
    modalRoot as Element
  );
};

export default Modal;

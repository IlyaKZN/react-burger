import React, { FC } from "react";
import ReactDOM from "react-dom";
import ModalHeader from "../modal-header/modal-header";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch } from "react-redux";
import {
  DELETE_VIEWED_INGREDIENT,
  DELETE_ORDER_DATA,
} from "../../services/actions";
import { useRouteMatch, useParams } from "react-router";
import { useSelector } from "../../services/types/hooks";
const modalRoot = document.getElementById("react-modals");

interface IModalProps {
  typeModal: string;
  header?: string;
}

const Modal: FC<IModalProps> = ({ typeModal, header = "", children }) => {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    document.addEventListener("keydown", checkButton);

    return () => {
      document.removeEventListener("keydown", checkButton);
    };
  }, []);

  const checkButton = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      checkModalType();
    }
  };

  //Проверяем какое именно модальное окно открыто и отправляем нужный action
  const checkModalType = () => {
    switch (typeModal) {
      case "ingredientDetails":
        {
          dispatch({
            type: DELETE_VIEWED_INGREDIENT,
          });
        }
        break;
      case "orderNumber":
        {
          dispatch({
            type: DELETE_ORDER_DATA,
          });
        }
        break;
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <ModalHeader onClose={checkModalType}>{header}</ModalHeader>
        {children}
      </div>
      <ModalOverlay onClose={checkModalType} />
    </>,
    modalRoot as Element
  );
};

export default Modal;

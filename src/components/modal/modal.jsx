import React from "react";
import ReactDOM from 'react-dom';
import ModalHeader from "../modal-header/modal-header";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { DELETE_VIEWED_INGREDIENT, DELETE_ORDER_DATA } from "../../services/actions";
const modalRoot = document.getElementById('react-modals');

function Modal(props) {

  const dispatch = useDispatch();

  React.useEffect(()=>{

    document.addEventListener("keydown", checkButton);

    return () => {
      document.removeEventListener("keydown", checkButton)
    }
  }, [])

  const checkButton = (evt) => {
    if (evt.key === 'Escape' || evt.type === 'click') {
      checkModalType();
    }
  }

  //Проверяем какое именно модальное окно открыто и отправляем нужный action
  const checkModalType = () => {
    switch (props.typeModal) {
      case 'ingredientDetails': {
        dispatch({
          type: DELETE_VIEWED_INGREDIENT
        })
      }
      case 'orderNumber': {
        dispatch({
          type: DELETE_ORDER_DATA
        })
      }
    }
  }

  return ReactDOM.createPortal(
    ( 
      <>
        <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10`}>
          <ModalHeader onClose={checkButton}>{props.header}</ModalHeader>
          {props.children}
        </div>
        <ModalOverlay onClose={checkButton}/>
      </>
    ),
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.oneOfType([
    PropTypes.string.isRequired
  ]),
  typeModal: PropTypes.string.isRequired
};

export default Modal;
import React from "react";
import ReactDOM from 'react-dom';
import ModalHeader from "../modal-header/modal-header";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
const modalRoot = document.getElementById('react-modals');

function Modal(props) {

  React.useEffect(()=>{

    document.addEventListener("keydown", checkButton);

    return () => {
      document.removeEventListener("keydown", checkButton)
    }
  }, [])

  const checkButton = (evt) => {
    if (evt.key === 'Escape') {
      props.onClose()
    }
  }

  return ReactDOM.createPortal(
    ( 
      <>
        <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10`}>
          <ModalHeader onClose={props.onClose}>{props.header}</ModalHeader>
          {props.children}
        </div>
        <ModalOverlay onClose={props.onClose}/>
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
  onClose: PropTypes.func.isRequired
};

export default Modal;
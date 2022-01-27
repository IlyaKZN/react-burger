import React from "react";
import overlayStyles from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

function ModalOverlay(props) {

  return (
    <div className={overlayStyles.modalOverlay} onClick={props.onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay
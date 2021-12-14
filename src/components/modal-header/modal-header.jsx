import React from "react";
import modalHeaderStyles from "./modal-header.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function ModalHeader(props) {

  return (
    <div className={modalHeaderStyles.header}>
      <h3 className="text text_type_main-large">{props.children}</h3>
      <div className={modalHeaderStyles.closeButton}>
        <CloseIcon type="primary" onClick={props.onClose}/>
      </div>
    </div>
  )
  
}

ModalHeader.propTypes = {
  children: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default ModalHeader;
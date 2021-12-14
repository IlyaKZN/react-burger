import React from "react";
import HeaderButtonStyles from "./button-header.module.css";
import PropTypes from 'prop-types';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function ButtonHeader(props) {

  const [state, setState] = React.useState({ type : props.initial })

  const setType = () => {
    setState({type : state.type === 'primary' ? 'secondary' : 'primary'})
  }

  const getIcon = (name) => {
    switch(name) {
      case "burger":
        return (
          <BurgerIcon type = {state.type}/>
        )
      break;
      case "list":
        return (
          <ListIcon type = {state.type}/>
        )
      break;
      case "profile":
        return (
          <ProfileIcon type = {state.type}/>
        )
      break;
    }
  }

  return (
    <button className={HeaderButtonStyles.button} onClick={setType}>
      {getIcon(props.name)} <p className={state.type === 'primary' ? `${HeaderButtonStyles.text} ${HeaderButtonStyles.active} ${HeaderButtonStyles.textNormal} text text_type_main-default ml-2`
        : `${HeaderButtonStyles.text} ${HeaderButtonStyles.textNormal} text text_type_main-default ml-2`}>{props.children}</p>
    </button>
  )

}
ButtonHeader.propTypes = {
  name: PropTypes.string,
  initial: PropTypes.string,
  children: PropTypes.string
};

export default ButtonHeader;
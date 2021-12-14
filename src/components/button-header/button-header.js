import React from "react";
import HeaderButtonStyles from "./button-header.module.css";
import PropTypes from 'prop-types';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

class ButtonHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type : props.initial
    };
    this.icon = props.icon;
  }

  setType = () => {
    this.setState({type : this.state.type === 'primary' ? 'secondary' : 'primary'})
  }

  getIcon = (name) => {
    switch(name) {
      case "burger":
        return (
          <BurgerIcon type = {this.state.type}/>
        )
      break;
      case "list":
        return (
          <ListIcon type = {this.state.type}/>
        )
      break;
      case "profile":
        return (
          <ProfileIcon type = {this.state.type}/>
        )
      break;
    }
  }

  render() {
    return (
      <button className={HeaderButtonStyles.button} onClick={this.setType}>
        {this.getIcon(this.props.name)} <p className={this.state.type === 'primary' ? `${HeaderButtonStyles.text} ${HeaderButtonStyles.active} ${HeaderButtonStyles.textNormal} text text_type_main-default ml-2`
          : `${HeaderButtonStyles.text} ${HeaderButtonStyles.textNormal} text text_type_main-default ml-2`}>{this.props.children}</p>
      </button>
    )
  }

}

ButtonHeader.propTypes = {
  name: PropTypes.string,
  initial: PropTypes.string,
  children: PropTypes.string
};

export default ButtonHeader;
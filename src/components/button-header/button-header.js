import React from "react";
import HeaderButtonStyles from "./button-header.module.css";
import PropTypes from 'prop-types';

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

  render() {
    return (
      <button className={HeaderButtonStyles.button} onClick={this.setType}>
        {<this.icon type = {this.state.type}/>}<p className={this.state.type === 'primary' ? `${HeaderButtonStyles.text} ${HeaderButtonStyles.active} ${HeaderButtonStyles.textNormal} text text_type_main-default`
          : `${HeaderButtonStyles.text} ${HeaderButtonStyles.textNormal} text text_type_main-default`}>{this.props.children}</p>
      </button>
    )
  }

}

ButtonHeader.propTypes = {
  icon: PropTypes.func,
  initial: PropTypes.string,
  children: PropTypes.string
};

export default ButtonHeader;
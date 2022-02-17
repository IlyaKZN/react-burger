import React, { FC } from "react";
import HeaderButtonStyles from "./button-header.module.css";
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IButtonHeaderProps {
  initial: 'secondary' | 'primary' | 'error' | 'success';
  name: string;
}

const ButtonHeader: FC<IButtonHeaderProps> = ({ name, initial, children }) => {

  const [state, setState] = React.useState({ type : initial })

  const setType = (): void => {
    setState({type : state.type === 'primary' ? 'secondary' : 'primary'})
  }

  const getIcon = (name: string) => {
    switch(name) {
      case "burger":
        return (
          <BurgerIcon type={state.type}/>
        )
      break;
      case "list":
        return (
          <ListIcon type={state.type}/>
        )
      break;
      case "profile":
        return (
          <ProfileIcon type={state.type}/>
        )
      break;
    }
  }

  return (
    <button className={HeaderButtonStyles.button} onClick={setType}>
      {getIcon(name)} <p className={state.type === 'primary' ? `${HeaderButtonStyles.text} ${HeaderButtonStyles.active} ${HeaderButtonStyles.textNormal} text text_type_main-default ml-2`
        : `${HeaderButtonStyles.text} ${HeaderButtonStyles.textNormal} text text_type_main-default ml-2`}>{children}</p>
    </button>
  )

}

export default ButtonHeader;
import React, { useEffect, useRef, FunctionComponent } from "react";
import HeaderButtonStyles from "./button-header.module.css";
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from 'react-router-dom';

interface IButtonHeaderProps {
  initial: 'secondary' | 'primary' | 'error' | 'success';
  name: string;
}

interface IButtonHeader {
  link: string;
  icon: JSX.Element;
}

const ButtonHeader: FunctionComponent<IButtonHeaderProps> = ({ name, children }) => {

  const path = useLocation().pathname

  const [state, setState] = React.useState<IButtonHeader>({ link: '', icon: <></> })

  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    switch(name) {
      case "burger":
        setState({ ...state, link: '/', icon: <BurgerIcon type={path === '/' ? 'primary' : 'secondary'} />});
        break;
      case "list":
        setState({ ...state, link: '/feed', icon: <ListIcon type={path === '/feed' ? 'primary' : 'secondary'}/> });
        break;
      case "profile":
        setState({ ...state, link: '/profile', icon: <ProfileIcon type={path === '/profile' ? 'primary' : 'secondary'}/> });
        break;
    }
  }, [path])
  

  return (
    <>
      <NavLink 
        exact
        to={state.link} 
        ref={linkRef}
        className={`${HeaderButtonStyles.text} ${HeaderButtonStyles.link} ${HeaderButtonStyles.textNormal}
          text text_type_main-default ml-2`} 
        activeClassName={`${HeaderButtonStyles.link} ${HeaderButtonStyles.activeLink} ${HeaderButtonStyles.text}
          ${HeaderButtonStyles.textNormal} text text_type_main-default ml-2`} >
        <>
          {state.icon}
          {children}
        </>
      </NavLink> 
    </>
  )

}

export default (ButtonHeader);
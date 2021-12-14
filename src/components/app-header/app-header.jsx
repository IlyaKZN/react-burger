import React from "react";
import headerStyles from './app-header.module.css';
import ButtonHeader from "../button-header/button-header";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={`${headerStyles.header} pt-4 pb-4`}>
      <div className={headerStyles.content}>
        <nav className={headerStyles.navigation}>
          <ul className={headerStyles.navigationList}>
            <li className={`${headerStyles.navigationItem} pr-5`} >
              <ButtonHeader name='burger' initial='primary'>Конструктор</ButtonHeader>
            </li>
            <li className={`${headerStyles.navigationItem} pl-5 pr-5`}>
              <ButtonHeader name='list' initial='secondary'>Лента заказов</ButtonHeader>
            </li>
            <li className={`${headerStyles.navigationItem} pl-5`}>
              <ButtonHeader name='profile' initial='secondary'>Личный кабинет</ButtonHeader>
            </li>
          </ul>
        </nav>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
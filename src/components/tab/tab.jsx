import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = ({onTabClick, current, sections}) => {
  return (
    <div style={{ display: 'flex' }} className={`mb-10`}>
      <Tab value={1} active={current === 1} onClick={value => {
          onTabClick(value, sections[0])
        }}>
        Булки
      </Tab>
      <Tab value={2} active={current === 2} onClick={value => {
          onTabClick(value, sections[1])
        }}>
        Соусы
      </Tab>
      <Tab value={3} active={current === 3} onClick={value => {
          onTabClick(value, sections[2])
        }}>
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs;
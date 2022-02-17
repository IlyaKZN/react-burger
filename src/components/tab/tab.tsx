import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

interface ITabsProps {
  onTabClick: Function;
  current: string;
  sections: React.RefObject<HTMLInputElement>[]
}

const Tabs: FC<ITabsProps> = ({onTabClick, current, sections}) => {
  return (
    <div style={{ display: 'flex' }} className={`mb-10`}>
      <Tab value="one" active={current === "one"} onClick={value => {
          onTabClick(value, sections[0])
        }}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={value => {
          onTabClick(value, sections[1])
        }}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={value => {
          onTabClick(value, sections[2])
        }}>
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs;
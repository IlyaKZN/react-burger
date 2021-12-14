import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      bun: {}
    }
  }

  componentDidMount() {
    for(let i = 1; i < 12; i++) {
      this.setState(previousState => ({
        selectedItems: [...previousState.selectedItems, this.props.data[i]]
    }));
    }
    this.setState({ bun: this.props.data[0] });
  }

  render() {
    return(
      <div className={`${burgerConstructorStyles.burgerConstructor}`}>
        <ul className={`${burgerConstructorStyles.elementsList}`}>
          <li className={`${burgerConstructorStyles.element} mr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${this.state.bun.name} (верх)`}
              price={this.state.bun.price}
              thumbnail={this.state.bun.image}
            />
          </li>
          <div className={`${burgerConstructorStyles.elementsList} ${burgerConstructorStyles.container}`}>
            {this.state.selectedItems.map((el, index) => (
              <li key={el._id} className={`${burgerConstructorStyles.element} pr-2`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </li>
            ))}
          </div>
          <li className={`${burgerConstructorStyles.element} mr-4 mb-10`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${this.state.bun.name} (низ)`}
              price={this.state.bun.price}
              thumbnail={this.state.bun.image}
            />
          </li>
        </ul>
        <div className={`${burgerConstructorStyles.confirmContainer} mr-4`}>
          <div className={`${burgerConstructorStyles.priceContainer} mr-10`}>
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">
            Нажми на меня
          </Button>
        </div>
      </div>
    )
  }
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerConstructor;
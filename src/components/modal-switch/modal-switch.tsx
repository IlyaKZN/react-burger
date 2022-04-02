import { Switch, useLocation, Route } from "react-router";
import { IngredientPage } from "../../pages/ingredient-page";
import Modal from "../modal/modal";
import IngredientDetails from "../Ingredient-details/Ingredient-details";

interface ILocationState {
  from: string,
  background?: {
    pathname: string;
    search: string;
    state: {};
    hash: string;
    key?: string | undefined;
  }
}

export const ModalSwitch = () => {

  let location = useLocation<ILocationState>();

  let background = location.state?.background || undefined;

  console.log(background)

  return (
    <div>
      <Switch location={background || location}>
        
      </Switch>
      
    </div>
  )
}
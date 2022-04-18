import IngredientDetails from "../../components/Ingredient-details/Ingredient-details";
import styles from "./ingredient-page.module.css";

export const IngredientPage = () => {
  return (
    <section className={styles.ingredientPage}>
      <div className={styles.container}>
        <h3 className="text text_type_main-large">Детали ингредиента</h3>
        <IngredientDetails />
      </div>
    </section>
  )
}
import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService {

  ingredientPublisher = new EventEmitter<Ingredient>();
  ingredientsFromRecipePublisher = new EventEmitter<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 4)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }
}

import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientsEdited = new Subject<void>();
  startedEditing = new Subject<{i: number,ingredient: Ingredient}>();
  buttonClicked = new Subject<void>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 4)
  ];

  getIngredients(){
    console.log(this.ingredients.slice());
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next([ingredient]);
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(ingredients);
  }

  editIngredient(ingredient: Ingredient, index: number){
    this.ingredients[index]=ingredient;
    this.ingredientsEdited.next();
  }

  removeIngredient(id: number){
    this.ingredients.splice(id,1);
    this.ingredientsEdited.next();
  }
}

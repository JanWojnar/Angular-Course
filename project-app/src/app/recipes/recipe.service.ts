import {Recipe} from "./recipe-list/recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  recipeMoveIngredients = new EventEmitter<Ingredient[]>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Test description1', 'https://www.acouplecooks.com/wp-content/uploads/2021/03/' +
      'Cheese-Tortellini-011-735x919.jpg', [new Ingredient('Pineapple', 5),
      new Ingredient('Avocado', 2)]),
    new Recipe('Another Test Recipe', 'Test description2', 'https://images.aws.nestle.recipes/' +
      'resized/4ba9b1e4cf3d3f052daa13595dea014c_large_fresh_fruit_saladjpg_1618110218_1004_633.jpeg',
      [new Ingredient('Orange', 12), new Ingredient('Pear', 17)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id:number){
    return this.recipes[id];
  }
}

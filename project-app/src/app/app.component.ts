import { Component } from '@angular/core';
import {Recipe} from "./recipes/recipe-list/recipe.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-app';
  recipesView: boolean = true;
  shoppingListView: boolean = false;

  selectedRecipe!: Recipe;

  onNavigate(feature: string){
    if(feature === 'recipes'){
      this.recipesView=!this.recipesView;
    } else if(feature === 'shoppingList'){
      this.shoppingListView=!this.shoppingListView;
    }
  }
  onRecipeSelection(recipe: Recipe){
    this.selectedRecipe = recipe;
  }
}

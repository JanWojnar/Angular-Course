import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe-list/recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeDetail!: Recipe;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onMoveClick(){
    this.shoppingListService.ingredientsFromRecipePublisher.emit(this.recipeDetail.ingredients.slice());
  }

}

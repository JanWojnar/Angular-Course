import {Component, Injectable, OnInit} from '@angular/core';
import {Recipe} from "../recipe-list/recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Injectable()
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail!: Recipe;
  id!: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id= +params['id'];
        this.recipeDetail = this.recipeService.getRecipeById(this.id);
      }
    );
  }

  onMoveClick(){
    this.shoppingListService.addIngredients(this.recipeDetail.ingredients);
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route})
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes'])
  }
}

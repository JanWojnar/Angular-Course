import {Component, Injectable, OnInit} from '@angular/core';
import {Recipe} from "../recipe-list/recipe.model";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import {ShoppingListState} from "../../shopping-list/store/shopping-list.reducer";

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
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<ShoppingListState>) {
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
    // this.shoppingListService.addIngredients(this.recipeDetail.ingredients);
    console.log('DISPATCHUJE!!!');
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients));
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route})
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes'])
  }
}

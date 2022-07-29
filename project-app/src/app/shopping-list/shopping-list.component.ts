import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription, Subject} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  subscriptionIngChanged!: Subscription;
  subscriptionEdited!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = shoppingListService.getIngredients();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscriptionIngChanged = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients.push(...ingredients);
      });
    this.subscriptionEdited = this.shoppingListService.ingredientsEdited
      .subscribe(() => {
        this.ingredients = this.shoppingListService.getIngredients();
      })
  }

  ngOnDestroy(): void {
    this.subscriptionIngChanged.unsubscribe();
    this.subscriptionEdited.unsubscribe();
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next({i: id, ingredient: this.ingredients[id]});
  }
}

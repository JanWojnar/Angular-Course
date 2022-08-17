import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription, Subject, Observable} from "rxjs";
import {LoggingService} from "../logging.service";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/store/app-state";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions"
import {ShoppingListState} from "./store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[] = [];
  ingredients: Observable<{ingredients: Ingredient[]}>;
  // subscriptionIngChanged!: Subscription;
  // subscriptionEdited!: Subscription;
  subscriptionBtnClicked!: Subscription;
  selectedId!: number;

  shoppingListState: Observable<ShoppingListState>;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService,
              private store: Store<AppState>) {
    // this.ingredients = shoppingListService.getIngredients();
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    this.shoppingListState = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscriptionIngChanged = this.shoppingListService.ingredientsChanged
    //   .subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients.push(...ingredients);
    //   });
    // this.subscriptionEdited = this.shoppingListService.ingredientsEdited
    //   .subscribe(() => {
    //     this.ingredients = this.shoppingListService.getIngredients();
    //   })
    this.subscriptionBtnClicked = this.shoppingListService.buttonClicked
      .subscribe(() => {
        this.selectedId=-1;
      })
  }

  ngOnDestroy(): void {
    // this.subscriptionIngChanged.unsubscribe();
    // this.subscriptionEdited.unsubscribe();
  }

  onEditItem(id: number) {
    if(this.selectedId!==id){
      this.selectedId=id;
      this.shoppingListService.startedEditing.next({i: id, ingredient: this.ingredients[id]});
      this.store.dispatch(new ShoppingListActions.StartEditIngredient(id));
    } else {
      this.selectedId=-1;
      this.shoppingListService.buttonClicked.next();
      this.store.dispatch(new ShoppingListActions.StopEditIngredient());
    }
  }
}

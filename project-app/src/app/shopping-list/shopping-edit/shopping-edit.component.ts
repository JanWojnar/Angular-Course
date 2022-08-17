import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {FormGroup, NgForm} from "@angular/forms";
import {Subscription,Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.actions';
import {ShoppingListState} from "../store/shopping-list.reducer";
import {AppState} from "../../shared/store/app-state";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') editForm!: NgForm;

  startedEditingSub!: Subscription;
  endOfEditSub!: Subscription;
  editMode: boolean = false;

  selectedIngredient!: Ingredient;
  indexOfEditingItem!: number;
  shoppingListState: Observable<ShoppingListState>;

  constructor(private shoppingListService: ShoppingListService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.shoppingListState = this.store.select('shoppingList');
    this.shoppingListState.subscribe(stateData => {
      if(stateData.editedIngredientIndex>-1){
        this.editMode=true;
        this.selectedIngredient=stateData.editedIngredient;
      } else {
        this.editMode=false;
      }
    })
    this.startedEditingSub = this.shoppingListService.startedEditing
      .subscribe((data: {i: number,ingredient: Ingredient}) => {
        this.editMode=true;
        this.indexOfEditingItem=data.i;
        this.selectedIngredient=data.ingredient;
        this.editForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount
        })
      });
    this.endOfEditSub = this.shoppingListService.buttonClicked
      .subscribe(()=> {
        this.editMode=false;
      });
  }


  ngOnDestroy(): void {
    this.startedEditingSub.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }


  onAddClick(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    console.log('DISPATCHUJE NIE!');

    if(!this.editMode){
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.indexOfEditingItem, ingredient: newIngredient}));
      this.editMode=false;
    }
    this.shoppingListService.buttonClicked.next()
    form.reset();
  }

  onClearClick(){
    this.editMode=false;
    this.editForm.reset();
    this.shoppingListService.buttonClicked.next()
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }

  onDeleteClick(){
    this.editMode=false;
    this.shoppingListService.buttonClicked.next()
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.indexOfEditingItem));
  }

}

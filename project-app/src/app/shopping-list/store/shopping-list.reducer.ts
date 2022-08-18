import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";


export interface ShoppingListState {
  ingredients: Ingredient[],
  editedIngredientIndex: number,
  editedIngredient: Ingredient
}
// @ts-ignore
export const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 4)
  ],
  editedIngredientIndex: -1,
  editedIngredient: null
};

export function shoppingListReducer
(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.Actions
): ShoppingListState {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT: {
      let modifiedTable = state.ingredients.slice();
      modifiedTable[action.payload.index]=action.payload.ingredient;
      return {
        ...state,
        ingredients: modifiedTable
      }
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      let modifiedTable = state.ingredients.slice()
      modifiedTable.splice(action.payload,1);
      return {
        ...state,
        ingredients: modifiedTable
      }
    }
    case ShoppingListActions.START_EDIT_INGREDIENT : {
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: state.ingredients[action.payload]
      }
    }
    case ShoppingListActions.STOP_EDIT_INGREDIENT : {
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      }
    }
    default:
      return state;
  }
}

import {shoppingListReducer, ShoppingListState} from "../../shopping-list/store/shopping-list.reducer";
import {authReducer, AuthState} from "../../auth/store/auth.reducer";

import {ActionReducerMap} from "@ngrx/store";

export const rootReducer = {};

export interface AppState {
  shoppingList: ShoppingListState;
  authorization: AuthState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer,
  authorization: authReducer
}

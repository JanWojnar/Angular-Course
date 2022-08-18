import {User} from "../user.model";
import {AthActions} from "./auth.actions";
import * as AuthActions from "../store/auth.actions"

export interface AuthState {
  user: User
}

const initialState = {
  user: null
}

export function authReducer(state = initialState, action: AthActions) : AuthState {
  switch (action.type) {
    case AuthActions.LOGIN :
      return {
        ...state,
        user: action.payload
    }
    case AuthActions.LOGOUT:{
      return {
        ...state,
        user: null
      }
    }
    default: {
      return {
        ...state
      };
    }
  }
}

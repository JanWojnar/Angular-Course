import {Action} from "@ngrx/store";
import {User} from "../user.model";

export const LOGIN = '[Authorization] LOGIN';
export const LOGOUT = '[Authorization] LOGOUT';

export type AthActions = Login | Logout;

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload : User) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;

}

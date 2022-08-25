import {Action} from "@ngrx/store";
import {User} from "../user.model";

export const LOGIN = '[Authorization] LOGIN';
export const AUTHENTICATE_SUCCESS = '[Authorization] LOGIN_START';
export const AUTHENTICATE_FAIL = '[Authorization] LOGIN_FAIL';
export const LOGOUT = '[Authorization] LOGOUT';

export const SIGNUP = '[Authorization] SIGNUP';
export const SIGNUP_START = '[Authorization] SIGNUP_START'

export const ACKNOWLEDGE = '[Authorization] ACKNOWLEDGE';

export type AthActions = AuthenticateSuccess | Logout | AuthenticateFail | Login | Signup | Acknowledge;

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload : User) {}
}

export class AuthenticateFail {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Login {
  readonly type = LOGIN;
  constructor(public payload: {email: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
  constructor(public payload: { email: string, password: string }) {}
}

export class Acknowledge implements Action {
  readonly type = ACKNOWLEDGE;
}



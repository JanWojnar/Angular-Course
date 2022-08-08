import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError, BehaviorSubject} from "rxjs";
import {User} from "./user.model";
import {Subject} from "rxjs";


export interface AuthResponseData {
  idToken: string,
  email: string,
  kind: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null!);

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8kIjNtyFk1jGqbqqtURNS6kRT8xWs3Bs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleSingUpError),
      tap((response: AuthResponseData) => {
        this.handleAuthentication(response);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8kIjNtyFk1jGqbqqtURNS6kRT8xWs3Bs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleSignInError),
      tap((response: AuthResponseData) => {
        this.handleAuthentication(response);
      }));
  }

  handleAuthentication(response: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    const user = new User(response.email, response.localId, response.idToken, expirationDate);
    this.user.next(user);
  }

  handleSingUpError(errRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
    }
    return throwError(errorMessage);
  }

  handleSignInError(errRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED' :
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessage);
  }
}

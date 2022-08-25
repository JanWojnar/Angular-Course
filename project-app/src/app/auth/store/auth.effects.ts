import {Actions, Effect, ofType} from '@ngrx/effects'
import * as AuthActions from '../store/auth.actions'
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {AuthResponseData} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {User} from "../user.model";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    switchMap((authData: AuthActions.Login) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firbaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          const loadedUser = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            new Date(new Date().getTime() + +resData.expiresIn * 1000))
          return new AuthActions.AuthenticateSuccess(loadedUser);
        }),
        catchError(errorRes => {
          console.log('ERROR LOG: ')
          console.log(errorRes);
          let errorMessage = 'An unknown error occurred!';
          if(!errorRes.error || !errorRes.error.error){
            console.log('CZEGO TU JESTEM?');
            return of(new AuthActions.AuthenticateFail(errorMessage));
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct'
              break;
          }
          return of(new AuthActions.AuthenticateFail(errorMessage));
        })
      )
    }),
  )

  @Effect({dispatch:false})
  authSuccess = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), tap(() => {
    this.router.navigate(['/'])
  }))

}

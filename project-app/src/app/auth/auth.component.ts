import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.onLogin(email, password);
    } else {
      authObs = this.onSignUp(email, password);
    }
    this.manageResponse(authObs);
    form.reset();
  }

  onSignUp(email: string, password: string) {
    return this.authService.signup(email, password);
  }

  onLogin(email: string, password: string) {
    return this.authService.login(email, password);
  }

  onHandleError(){
    this.error = '';
  }

  manageResponse(authObs: Observable<AuthResponseData>){
    authObs.subscribe(
      (resData: AuthResponseData) => {
        console.log(resData)
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errMessage: string) => {
        this.error = errMessage;
        this.isLoading = false;
      }
    )
  }


  ngOnInit(): void {
  }
}

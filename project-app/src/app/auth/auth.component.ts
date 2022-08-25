import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {AppState} from "../shared/store/app-state";
import {Store} from "@ngrx/store";
import * as AuthActions from "../auth/store/auth.actions"
import {AlertComponent} from "../shared/alert/alert.component";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error = '';
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  // constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  // }

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) {
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
      console.log('Wpisano email:' + email + ' Wpisano hasło: ' + password)
      this.store.dispatch(new AuthActions.Login({email: email, password: password}));
    } else {
      authObs = this.onSignUp(email, password);
    }
    // this.manageResponse(authObs);
    form.reset();
  }

  onSignUp(email: string, password: string) {
    return this.authService.signup(email, password);
  }

  // onLogin(email: string, password: string) {
  //   return this.authService.login(email, password);
  // }

  // showErrorAlert(message: string){
  //   // const alertCmp = new AlertComponent();
  //   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
  //     AlertComponent
  //   );
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();
  //
  //   const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
  //
  //   componentRef.instance.message = message;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }

  onHandleError(){
    this.store.dispatch(new AuthActions.Acknowledge());
  }

  manageResponse(authObs: Observable<AuthResponseData>){
    authObs.subscribe( (resData: AuthResponseData) => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    })
    // authObs.subscribe(
    //   (resData: AuthResponseData) => {

    //   },
    //   (errMessage: string) => {
    //     this.error = errMessage;
    //     // this.showErrorAlert();
    //     this.isLoading = false;
    //   }
    // )
  }


  ngOnInit(): void {
    this.store.select('authorization').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    })
  }
}

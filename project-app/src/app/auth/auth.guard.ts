import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if(user){
          console.log('MAP: true');
          return true;
        }
        console.log('MAP: false');
        return this.router.createUrlTree(['/auth']);

      }),
      tap(isAuth => {
        console.log('TAP: ' + isAuth)
        if (!isAuth) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}

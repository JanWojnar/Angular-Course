import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './user/user.service';
import {Subscription} from 'rxjs';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userActivated = false;
  private activeSub: Subscription;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.activeSub = this.userService.activatedEmitter.subscribe((didActivate:boolean) => {
      this.userActivated=didActivate;
    })
  }

  ngOnDestroy(): void {
    this.activeSub.unsubscribe();
  }
}

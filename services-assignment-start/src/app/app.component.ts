import {Component, OnInit} from '@angular/core';
import {UsersService} from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UsersService]
})
export class AppComponent {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];
  movesToActive=0;
  movesToInactive=0;

  constructor(private usersService: UsersService) {
    this.usersService.clicker.subscribe(
      (moveType: string) => moveType === 'active' ? this.movesToActive++ : this.movesToInactive++
    )
  }
}

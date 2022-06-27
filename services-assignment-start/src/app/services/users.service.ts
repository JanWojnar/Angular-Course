import {EventEmitter, Injectable} from "@angular/core";
import {CounterService} from "./counter.service";

@Injectable({providedIn: 'root'})
export class UsersService {

  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  clicker = new EventEmitter<string>();

  constructor(private counterService: CounterService) {
  }

  moveToInactive(id:number){
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id,1);
    this.counterService.addInactive();
    this.clicker.emit('active');
  }

  moveToActive(id:number){
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id,1);
    this.counterService.addActive();
    this.clicker.emit('inactive');
  }
}

import {Injectable} from "@angular/core";

@Injectable()
export class CounterService {

  setActiveMoves = 0;
  setInactiveMoves = 0;

  addActive(){
    this.setActiveMoves++;
  }

  addInactive(){
    this.setInactiveMoves++;
  }
}

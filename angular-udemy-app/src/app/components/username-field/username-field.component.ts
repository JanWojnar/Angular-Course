import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'username-practice',
  templateUrl: './username-field.component.html',
  styleUrls: ['./username-field.component.css']
})
export class UsernameFieldComponent implements OnInit {

  username = 'DefaultUser';
  //
  // onUsernameUpdate(event: Event): void {
  //   this.username = (<HTMLInputElement>event.target).value;
  // }
  onClear(): void {
    this.username = '';
  }

  isUsernameEmpty(){
    return this.username === '';
  }

  displayUsername(){
    if(this.username !== ''){
      return this.username;
    }
    return 'You aren\'t logged in';
  }

  constructor() { }
  ngOnInit(): void {
  }
}

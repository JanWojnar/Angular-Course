import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') registerForm: NgForm;
  defaultSubType: string = 'Advanced';

  subTypes: string[] = ['Basic','Advanced','Pro'];

  submitted: boolean = false;

  accData = {
    email: '',
    subType: '',
    password: ''
  }

  onSubmit(){
    console.log(this.registerForm);
    this.accData.email = this.registerForm.form.value.email;
    this.accData.subType = this.registerForm.form.value.subscription;
    this.accData.password = this.registerForm.form.value.password;
    this.submitted=true;
  }
}

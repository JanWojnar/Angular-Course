import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') signupForm: NgForm; //approach2
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted=false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    //   })
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  // onSubmit(form: NgForm){   //approach1
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.signupForm);  //approach2
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.submitted=true;

    this.signupForm.reset();
  }
}

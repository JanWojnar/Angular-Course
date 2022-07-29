import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupFrom: FormGroup;
  fobiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupFrom = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
    // this.signupFrom.valueChanges.subscribe((value) => {
    //   console.log(value);
    // })
    this.signupFrom.statusChanges.subscribe((value) => {
      console.log(value);
    })
    this.signupFrom.setValue({
      'userData': {
        'username': 'Jan',
        'email': 'John@gmail.com'
      },
      'gender': 'male',
      'hobbies': []
    })
    this.signupFrom.setValue({
      'userData': {
        'username': 'Twój statry',
        'email': 'John@gmail.com'
      },
      'gender': 'male',
      'hobbies': []
    })
  }

  onSubmit() {
    console.log(this.signupFrom);
    this.signupFrom.reset();
  }

  getControls() {
    return (<FormArray>this.signupFrom.get('hobbies')).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupFrom.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.fobiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
        } else {
          resolve(null)
        }
      }, 1500)
    });
    return promise;
  }
}

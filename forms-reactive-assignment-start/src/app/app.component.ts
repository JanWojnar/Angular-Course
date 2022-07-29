import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;
  statuses: string[] = ['Stable', 'Critical', 'Finished']
  forbiddenProjectNames: string[] = ['Test']

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null,[Validators.required],[this.forbiddenProjectName.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null)
    })
  }

  onSubmit(){
    console.log(this.projectForm);
  }

  forbiddenProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(this.forbiddenProjectNames.indexOf(control.value)!==-1){
          resolve({'projectNameForbidden' : true});
        } else {
          resolve(null);
        }
      },1500)
    })
    return promise;
  }

}

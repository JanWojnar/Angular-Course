import { Component } from '@angular/core';
import {WelcomeComponent} from "./welcome/welcome.component";

@Component({
  imports: [WelcomeComponent],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

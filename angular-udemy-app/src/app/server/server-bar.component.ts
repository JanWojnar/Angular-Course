import {Component, Input} from "@angular/core";
import {Server} from "../useful-objects/server";

@Component({
  selector: 'app-server',
  templateUrl: './server-bar.component.html',
  styleUrls: ['./server-bar.component.css']
})
export class ServerBarComponent {

  @Input() server: Server = new Server('asd',1);

  constructor() {
  }
}

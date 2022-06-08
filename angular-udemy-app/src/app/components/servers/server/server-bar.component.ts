import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Server} from "../../../../utilities/classes/server";
import {HttpServiceComponent} from "../../../../utilities/services/http-service.component";

@Component({
  selector: 'app-server',
  templateUrl: './server-bar.component.html',
  styleUrls: ['./server-bar.component.css']
})
export class ServerBarComponent {

  @Input() server: Server;
  @Output() removeServerEvent = new EventEmitter<Server>();

  constructor() {
  }

  removeBar() {
    this.removeServerEvent.emit(this.server);
  }
}

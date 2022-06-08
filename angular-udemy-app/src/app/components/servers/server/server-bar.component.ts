import {Component, Input} from "@angular/core";
import {Server} from "../../../../utilities/classes/server";
import {HttpServiceComponent} from "../../../../utilities/services/http-service.component";

@Component({
  selector: 'app-server',
  templateUrl: './server-bar.component.html',
  styleUrls: ['./server-bar.component.css']
})
export class ServerBarComponent {

  @Input() server: Server = new Server('asd',1);

  constructor() {
  }

  async deleteThis(){
    await HttpServiceComponent.remove(this.server);
  }
}

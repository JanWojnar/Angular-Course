import {Component} from "@angular/core";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {

  serverID: number = 15;
  serverStatus: string = '';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline'
  }

  getColor(){
    return this.serverStatus === 'online' ? 'seagreen' : 'indianred';
  }
}

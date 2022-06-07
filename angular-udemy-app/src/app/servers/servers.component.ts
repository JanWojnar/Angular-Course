import { Component, OnInit } from '@angular/core';
import { ServerBarComponent } from "../server/server-bar.component";
import { Server } from "../useful-objects/server";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreated = false;
  serverCreationStatus = '';
  serverName = 'TestServer';
  servers: Server[] = [
    new Server('Testserver1',0),
    new Server('Testserver2', 1)
  ];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    },2000)
  }
  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is: ' + this.serverName;
    this.serverCreated = true;
    this.servers.push(new Server(this.serverName, this.servers.length));
  }

  getServerCreationStatus(){
    return this.serverCreationStatus;
  }
  // onUpdateServerName(event: Event) {
  //   console.log(event);
  //   this.serverName = (<HTMLInputElement>event.target).value;
  // }
}

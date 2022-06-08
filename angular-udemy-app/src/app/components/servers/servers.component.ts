import { Component, OnInit } from '@angular/core';
import { ServerBarComponent } from "./server/server-bar.component";
import { Server } from "../../../utilities/classes/server";
import { HttpServiceComponent } from "../../../utilities/services/http-service.component";

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
  servers: Server[] = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }
  async ngOnInit() {
    this.servers = await HttpServiceComponent.getTableOfServers();
  }

  async onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is: ' + this.serverName;
    this.serverCreated = true;
    await HttpServiceComponent.post(new Server(this.serverName));
    this.servers = await HttpServiceComponent.getTableOfServers();
  }

  getServerCreationStatus(){
    return this.serverCreationStatus;
  }

  async removeServer(server: Server){
    await HttpServiceComponent.remove(server);
    const index = this.servers.findIndex((serv) => serv.id===server.id);
    this.servers.splice(index,1);
  }




  // onUpdateServerName(event: Event) {
  //   console.log(event);
  //   this.serverName = (<HTMLInputElement>event.target).value;
  // }
}

import {Component, Inject, Injectable, OnInit} from '@angular/core';
import { ServerBarComponent } from "./server/server-bar.component";
import { Server } from "../../../utilities/classes/server";
import { HttpServiceComponent } from "../../../utilities/services/http-service.component";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
@Injectable()
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreated = false;
  serverCreationStatus = '';
  serverName = 'TestServer';
  servers: Server[] = [];

  constructor(public httpService: HttpServiceComponent) {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }
  async ngOnInit() {
    this.servers = await this.httpService.getTableOfServers();
  }

  async onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is: ' + this.serverName;
    this.serverCreated = true;
    await this.httpService.post(new Server(this.serverName));
    this.servers = await this.httpService.getTableOfServers();
  }

  getServerCreationStatus(){
    return this.serverCreationStatus;
  }

  async removeServer(server: Server){
    await this.httpService.remove(server);
    const index = this.servers.findIndex((serv) => serv.id===server.id);
    this.servers.splice(index,1);
  }

  async changeStatus(server: Server){
    const index = this.servers.findIndex((serv) => serv.id===server.id);
    if(server.serverStatus === 'online'){
      this.servers[index].serverStatus = 'offline';
    } else {
      this.servers[index].serverStatus = 'online';
    }
    await this.httpService.update(this.servers[index]);
  }




  // onUpdateServerName(event: Event) {
  //   console.log(event);
  //   this.serverName = (<HTMLInputElement>event.target).value;
  // }
}

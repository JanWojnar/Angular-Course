import {Component} from "@angular/core";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {

  serverID: number = 15;
  serverStatus: boolean = true;

  getServerStatus(){
    if(this.serverStatus){
      return 'online';
    }
    return 'offline';
  }
}

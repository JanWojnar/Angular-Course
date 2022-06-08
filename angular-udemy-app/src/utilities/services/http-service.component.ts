import {Server} from "../classes/server";

export class HttpServiceComponent {
  static async post(server: Server){
    await fetch('http://localhost:4200/api/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serverStatus: server.serverStatus,
        serverName: server.serverName
      })
    })
  }
  static async remove(server: Server){
    await fetch(`http://localhost:4200/api/servers/${server.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
  static async getTableOfServers(){
    let jsonResponse = await fetch('http://localhost:4200/api/servers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json());
    let servers: Server[] = [];
    for(let i = 0; i < jsonResponse.length ; i++){
       servers.push(<Server>jsonResponse[i]);
    }
    return servers;
  }
}

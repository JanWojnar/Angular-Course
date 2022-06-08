export class Server {

  id: number = -1;
  serverStatus: string = '';
  serverName: string = '';

  constructor(name?: string, id?: number) {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    if (typeof name !== 'undefined') {
      this.serverName = name;
    }
    if (typeof id !== 'undefined') {
      this.id = id;
    }
  }
}

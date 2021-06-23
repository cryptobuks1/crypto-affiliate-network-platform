import { Injectable } from '@angular/core';

declare const io: any;

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  private socket: any | undefined;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(data: any): void {
    this.socket.emit('message new', data);
  }

  getSocket() {
    return this.socket;
  }
}

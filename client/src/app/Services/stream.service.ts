import { Injectable } from '@angular/core';
import { serverAddr } from './settings';

declare const io: any;

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  private socket: any | undefined;

  constructor() {
    this.socket = io(serverAddr);
  }

  sendMessage(data: any): void {
    this.socket.emit('message new', data);
  }

  getSocket() {
    return this.socket;
  }
}

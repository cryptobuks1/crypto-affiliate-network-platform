import { Component, OnInit } from '@angular/core';
import { StreamService } from 'src/app/Services/stream.service';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-admin-live-chat',
  templateUrl: './admin-live-chat.component.html',
  styleUrls: ['./admin-live-chat.component.scss']
})
export class AdminLiveChatComponent implements OnInit {
  public chats: any[] | undefined;
  public inChat: boolean = false;
  public chat: any | undefined;
  public asideOpen: boolean = false;
  private socket: any | undefined;
  public message: string | undefined;

  constructor(
    private adminService: AdminService,
    private streamService: StreamService) {
    this.socket = this.streamService.getSocket();
  }

  ngOnInit(): void {
    this.fetchChats();

    this.socket.on('chat new sync', (data: any) => {
      this.chats?.push(data);
    });

  }

  fetchChats(): void {
    this.adminService.getChats().subscribe((response: iHttpResponse) => {
      if (response.success) {
        if (response.data.length > 0) {
          this.chats = response.data;
          this.selectChat(0);
        }
      }
    });
  }

  endChat(): void {
    this.socket.emit('chat end', { id: this.chat._id });
    this.chats?.splice(this.chats?.findIndex((chat: any) => chat._id === this.chat._id), 1);
    if (this.chats !== undefined && this.chats.length > 0) {
      this.chat = this.selectChat(0);
    }
  }

  selectChat(index: number): void {
    if (this.chats !== undefined) {
      this.chat = this.chats[index];
      this.inChat = true;
      this.socket.on(`message new ${this.chat._id}`, (data: any) => {
        this.chat.messages.push(data);
      });
    }
  }

  sendMessage(): void {
    this.socket.emit('message new', { admin: true, id: this.chat._id, fullName: 'Admin', message: this.message });
    this.chat.messages.push({ admin: true, id: this.chat._id, fullName: 'Admin', message: this.message });
    this.message = '';
  }
}

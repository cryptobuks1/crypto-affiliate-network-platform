import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { HttpService } from 'src/app/Services/http.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { StreamService } from 'src/app/Services/stream.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  public windowOpen: boolean = false;
  public stage: string = 'starting'; // starting, chatting, feedback
  public chatMessage: string | undefined;
  private socket: any | undefined;
  public formData: any = {
    fullName: '',
    email: '',
    description: '',
  };
  public chatData: any | undefined;

  constructor(
    private streamService: StreamService,
    private alertsStoreService: AlertsStoreService,
    private httpService: HttpService
  ) {
    this.socket = streamService.getSocket();
  }

  ngOnInit(): void {
    this.checkIfChatExists();
  }

  listenForMessages(id: string): void {
    if (this.chatData !== undefined) {
      this.socket.on(`message new ${id}`, (data: any) => {
        this.chatData.messages.push(data);
      });
    }
  }

  checkIfChatExists() {
    let chatId = sessionStorage.getItem('chatId');

    if (chatId !== null) {
      this.httpService.findChat(chatId).subscribe((response: iHttpResponse) => {
        if (response.success) {
          this.chatData = response.data;
          this.listenForMessages(response.data._id);
          this.stage = 'chatting';
        }
      });
    }
  }

  endChat() {
    this.streamService.sendMessage({
      message: `User Ended Chat`,
      id: this.chatData._id,
      fullName: 'Event:',
      admin: false,
    });
    this.stage = 'starting';
    this.chatMessage = '';
    this.chatData = undefined;
    this.windowOpen = false;
    sessionStorage.removeItem('chatId');
  }

  sendMessage(): void {
    if (
      this.chatMessage !== undefined &&
      this.chatMessage.length > 0 &&
      this.chatMessage !== null
    ) {
      this.streamService.sendMessage({
        message: this.chatMessage,
        id: this.chatData._id,
        fullName: 'You',
        admin: false,
      });
      this.chatData.messages.push({
        message: this.chatMessage,
        fullName: this.chatData.startedBy.fullName,
        admin: false,
      });
      this.chatMessage = undefined;
    }
  }

  startChat(): void {
    this.httpService
      .startChat(this.formData)
      .subscribe((response: iHttpResponse) => {
        if (response.success) {
          this.chatData = response.data;
          this.listenForMessages(response.data._id);
          sessionStorage.setItem('chatId', response.data._id);
          this.stage = 'chatting';
        } else {
          this.alertsStoreService.setAlert({
            text: response.message,
            type: 'error',
            show: true,
          });
        }
      });
  }
}

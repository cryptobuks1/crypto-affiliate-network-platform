import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { serverAddr } from 'src/app/Services/settings';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { StreamService } from 'src/app/Services/stream.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  public requests: any[] | undefined;
  public chats: any[] | undefined;
  public inChat: boolean = false;
  public chat: any | undefined;
  private socket: any | undefined;
  public message: string | undefined;

  constructor(
    private alertsStoreService: AlertsStoreService,
    public adminService: AdminService,
    private router: Router,
    public authService: AuthService,
    private streamService: StreamService
  ) {
    this.socket = this.streamService.getSocket();
  }

  ngOnInit(): void {
    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      if (!response.data) {
        this.router.navigate(['/']);
      }

      this.fetchRequests();
      this.fetchChats();
    });
  }

  getURL(img: string): string {
    return `${serverAddr}/uploads/${img}`;
  }

  fetchChats(): void {
    this.adminService.getChats().subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.chats = response.data;
        this.listenForEvents(response.data.map((chat: any) => chat._id));
      }
    });
  }

  leaveChat(): void {
    this.chat = undefined;
    this.inChat = false;
  }

  selectChat(index: number): void {
    if (this.chats !== undefined) {
      this.chat = this.chats[index];
      this.inChat = true;
    }
  }

  sendMessage(): void {
    this.socket.emit('message new', {
      admin: true,
      id: this.chat._id,
      fullName: 'Admin',
      message: this.message,
    });
    this.chat.messages.push({
      admin: true,
      id: this.chat._id,
      fullName: 'Admin',
      message: this.message,
    });
    this.message = '';
  }

  listenForEvents(ids: any): void {
    ids.forEach((id: string) => {
      this.socket.on(`message new ${id}`, (data: any) => {
        let chat = this.chats?.find((chat) => chat._id === id);
        chat.messages.push(data);
      });
    });
  }

  fetchRequests(): void {
    this.adminService.requests().subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.requests = response.data;
      }
    });
  }

  approve(id: string): void {
    this.adminService.approve({ id }).subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.fetchRequests();
      }

      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'success' : 'error'}`,
        show: true,
      });
    });
  }

  reject(id: string): void {
    this.adminService.reject({ id }).subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.fetchRequests();
      }
      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'success' : 'error'}`,
        show: true,
      });
    });
  }
}

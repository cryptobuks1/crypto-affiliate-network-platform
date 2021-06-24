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
  public requestsStore: any[] | undefined;
  public filterByStatusValue: string = 'all';
  public searchStr: string = '';
  public asideOpen: boolean = false;
  
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

      this.socket.on('chat new sync', (data: any) => {
        this.chats?.push(data);
      });
    });
  }

  getURL(img: string): string {
    return `${serverAddr}/uploads/${img}`;
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
    if (this.chats !== undefined) {
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

  fetchRequests(): void {
    this.adminService.requests().subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.requests = response.data;
        this.requestsStore = response.data;
      }
    });
  }

  approve(id: string, amount: number): void {
    this.adminService
      .approve({ id, amount })
      .subscribe((response: iHttpResponse) => {
        if (response.success) {
          let request = this.requests?.find((request: any) => request._id === id);
          request.approved = true;
          request.status = 'approved';
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
        let request = this.requests?.find((request: any) => request._id === id);
        request.approved = false;
        request.status = 'rejected';
      }
      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'success' : 'error'}`,
        show: true,
      });
    });
  }

  filter(searchStr: string): void {
    if (searchStr.length <= 0) {
      this.requests = this.requestsStore;
    } else {
      let regex = new RegExp(`${searchStr.toLowerCase()}.*`);
      this.requests = this.requestsStore?.filter((request: any) => {
        return regex.test(request.requestedBy.username.toLowerCase());
      });
    }
  }

  filterByStatus(val: string) {
    if (val === 'all') {
      this.fetchRequests();
    } else {
      this.requests = this.requestsStore?.filter((request: any) => request.status === val);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AdminService } from 'src/app/Services/admin.service';
import { StreamService } from './Services/stream.service';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAdmin: boolean = false;
  private user: any | undefined;
  private socket: any | undefined;

  constructor(
    private authService: AuthService,
    private streamService: StreamService,
    private adminService: AdminService) {
      this.socket = this.streamService.getSocket();
  }

  ngOnInit(): void {
    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      this.isAdmin = response.data;
    });

    this.authService.profile().subscribe((response: any) => {
      if(response.success) {
        this.user = response.data;
        this.listenForUpdates();  
      }
    });

    this.socket.emit('new user', {});
  }

  listenForUpdates() {
    this.socket.on(`update ${this.user._id}`, (data: any) => {
      console.log(data);
    });
  }
}

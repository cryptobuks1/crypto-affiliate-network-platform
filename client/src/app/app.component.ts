import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AdminService } from 'src/app/Services/admin.service';
import { StreamService } from './Services/stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAdmin: boolean = false;

  constructor(
    private streamService: StreamService,
    private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      this.isAdmin = response.data;
    });

    this.streamService.getSocket().emit('new user', {});
  }
}

import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAdmin: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      console.log(response);
      this.isAdmin = response.data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpServiceAuth } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss'],
})
export class DashboardNavComponent implements OnInit {
  public isAdmin: boolean = false;

  constructor(public httpServiceAuth: HttpServiceAuth) {}

  ngOnInit(): void {
    this.httpServiceAuth
      .isAdmin()
      .subscribe((response: iHttpResponse) => (this.isAdmin = response.data));
  }
}

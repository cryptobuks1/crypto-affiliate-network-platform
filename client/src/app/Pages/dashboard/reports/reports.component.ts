import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { HttpServiceAuth } from 'src/app/Services/http.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  private __ngContext__: any;
  public referrals: any[] = [];

  constructor(private httpServiceAuth: HttpServiceAuth) {}

  ngOnInit(): void {
    this.__ngContext__[0].querySelector('.page-title').textContent = 'Reports';
    this.profile();
    this.myReferrals();
  }

  profile(): void {
    this.httpServiceAuth.profile().subscribe((response: iHttpResponse) => {
      console.log(response);
    });
  }

  myReferrals() {
    this.httpServiceAuth.myReferrals().subscribe((response: iHttpResponse) => {
      if (response.success) {
        console.log(response.data);
        this.referrals = response.data;
      }
    });
  }
}

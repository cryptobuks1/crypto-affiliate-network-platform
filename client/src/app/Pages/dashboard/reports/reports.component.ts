import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  private __ngContext__: any;
  public referrals: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.__ngContext__[0].querySelector('.page-title').textContent = 'Reports';
    this.profile();
    this.myReferrals();
  }

  profile(): void {
    this.authService.profile().subscribe((response: iHttpResponse) => {
      console.log(response);
    });
  }

  myReferrals() {
    this.authService.myReferrals().subscribe((response: iHttpResponse) => {
      if (response.success) {
        console.log(response.data);
        this.referrals = response.data;
      }
    });
  }
}

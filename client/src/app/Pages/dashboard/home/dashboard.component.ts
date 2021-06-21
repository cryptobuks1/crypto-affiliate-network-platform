import { Component, OnInit } from '@angular/core';
import { HttpServiceAuth, HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  public priceData: any;
  public user: any = {};
  private __ngContext__: any;

  constructor(
    private httpService: HttpService,
    private httpServiceAuth: HttpServiceAuth
  ) {}

  ngOnInit(): void {
    this.profile();
    this.fetchPrices();
    this.__ngContext__[0].querySelector('.page-title').textContent =
      'Dashboard';
  }

  profile(): void {
    this.httpServiceAuth.profile().subscribe((response: iHttpResponse) => {
      this.user = response.data;
    });
  }

  affiliateLink(): string {
    return `${window.location.origin}/register?ref=${this.user.affiliateCode}`;
  }

  fetchPrices(): void {
    this.httpService
      .prices()
      .subscribe((response) => (this.priceData = response.data));
  }

  roundInt(int: number): any {
    if (int != undefined) {
      let numWithZeroes = int.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
      });
      return numWithZeroes;
    }

    return 0;
  }
}

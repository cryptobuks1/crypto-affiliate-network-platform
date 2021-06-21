import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  public priceData: any;
  public user: any | undefined;
  private __ngContext__: any;

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profile();
    this.fetchPrices();
    this.__ngContext__[0].querySelector('.page-title').textContent =
      'Dashboard';
  }

  profile(): void {
    this.authService.profile().subscribe((response: iHttpResponse) => {
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

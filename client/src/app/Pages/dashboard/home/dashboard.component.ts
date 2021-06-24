import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  public priceData: any;
  public user: any | undefined;
  public balanceHistory: any[] | undefined;
  public balanceHistorySummary: any[] | undefined;
  public options: any;
  public loadingChart: boolean = true;
  public email: string | undefined;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private alertsStoreService: AlertsStoreService
  ) {}

  ngOnInit(): void {
    this.profile();
    this.fetchPrices();
    this.fetchBalanceHistory();
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

  setOptions(): void {
    this.options = {
      backgroundColor: '#333',
      xAxis: {
        type: 'category',
        data: this.balanceHistorySummary?.map(
          (dataPoint) =>
            new Date(dataPoint.createdAt).toISOString().split('T')[0]
        ),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.balanceHistorySummary?.map(
            (dataPoint) => dataPoint.amount
          ),
          type: 'line',
          color: '#ffd700',
        },
      ],
    };
    this.loadingChart = false;
  }

  inviteFriend(): void {
    this.authService
      .inviteFriend({ email: this.email })
      .subscribe((response: iHttpResponse) => {
        if (response.success) {
          this.email = '';
        }

        this.alertsStoreService.setAlert({
          text: response.message,
          show: true,
          type: `${response.success ? 'info' : 'error'}`,
        });
      });
  }

  fetchBalanceHistory(): void {
    this.authService.balanceHistory().subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.balanceHistory = response.data.filter(
          (dataPoint: any) => !dataPoint.summary
        );

        this.balanceHistorySummary = response.data.filter(
          (dataPoint: any) => dataPoint.summary
        );

        this.setOptions();
      }
    });
  }

  roundInt(int: number): number | string {
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

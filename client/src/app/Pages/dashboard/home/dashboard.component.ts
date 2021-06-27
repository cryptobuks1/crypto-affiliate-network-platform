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
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    window.document.title = 'BNBG | Dashboard';

    this.profile();
  }

  profile(): void {
    this.authService.profile().subscribe((response: iHttpResponse) => {
      this.user = response.data;
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

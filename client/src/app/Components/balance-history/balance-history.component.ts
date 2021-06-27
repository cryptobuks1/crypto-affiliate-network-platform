import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-balance-history',
  templateUrl: './balance-history.component.html',
  styleUrls: ['./balance-history.component.scss']
})
export class BalanceHistoryComponent implements OnInit {
  public balanceHistory: any[] | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchBalanceHistory();
  }

  fetchBalanceHistory(): void {
    this.authService.balanceHistory({ summary: false }).subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.balanceHistory = response.data.filter((dataPoint: any) => !dataPoint.summary);
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

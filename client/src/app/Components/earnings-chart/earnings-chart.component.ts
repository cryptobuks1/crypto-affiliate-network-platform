import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-earnings-chart',
  templateUrl: './earnings-chart.component.html',
  styleUrls: ['./earnings-chart.component.scss']
})
export class EarningsChartComponent implements OnInit {
  private balanceHistorySummary: any[] | undefined;
  public options: any | undefined;
  public loadingChart: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchBalanceHistory();
  }

  fetchBalanceHistory(): void {
    this.authService.balanceHistory({ summary: true }).subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.balanceHistorySummary = response.data.filter((dataPoint: any) => dataPoint.summary);
        this.setOptions();
      }
    }); 
  }

  setOptions(): void {
    this.options = {
      backgroundColor: '#333',
      xAxis: {
        type: 'category',
        data: this.balanceHistorySummary?.map((dataPoint) => new Date(dataPoint.createdAt).toISOString().split('T')[0]),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.balanceHistorySummary?.map((dataPoint) => dataPoint.amount),
          type: 'line',
          color: '#ffd700',
        },
      ],
    };
    this.loadingChart = false;
  }
}

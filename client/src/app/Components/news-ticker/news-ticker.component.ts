import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'news-ticker',
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.scss'],
})
export class NewsTickerComponent implements OnInit {
  public dataPoints: any[] = [];

  constructor(private httpService: HttpService) {}

    
  ngOnInit(): void {}
  
  fetchPrices(): void {
    this.httpService.prices().subscribe((response: any) => {
      this.dataPoints = [
        { label: 'USD/BNB Gold', price: response.data.price },
        { label: 'USD/BNB', price: response.data.price_BNB }
      ];
    });
  }

  roundInt(int: number): number | string {
    if (int != undefined) {
      let numWithZeroes = int.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return numWithZeroes;
    }

    return 0;
  }

}

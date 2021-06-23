import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'news-ticker',
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.scss'],
})
export class NewsTickerComponent implements OnInit, OnChanges {
  @Input() priceData: any;
  public dataPoints: any[] = [];

  constructor() {}

  ngOnChanges() {
    if (this.priceData != undefined) {
      this.dataPoints = [
        {
          label: 'USD/BNB Gold',
          price: this.priceData.price,
        },
        {
          label: 'USD/BNB',
          price: this.priceData.price_BNB,
        },
      ];
    }
  }

  ngOnInit(): void {}
}

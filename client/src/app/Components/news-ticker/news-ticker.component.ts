import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'news-ticker',
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.scss'],
})
export class NewsTickerComponent implements OnInit {
  @Input() priceData: any;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => console.log(this.priceData), 3000);
  }

  round(n: number): number {
    return n;
  }
}

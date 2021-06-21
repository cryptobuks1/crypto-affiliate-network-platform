import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../page.scss']
})
export class DashboardHomeComponent implements OnInit {
  public priceData: any;
  public user: any = {};
  private __ngContext__: any;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.profile();
    this.fetchPrices();
    this.__ngContext__[0].querySelector('.page-title').textContent = 'Dashboard'
  }

  profile(): void {
    this.httpService.profile().subscribe((response: iHttpResponse) => {
        this.user = response.data;
    });
  }

  affiliateLink(): string {
    return `${window.location.origin}/register?ref=${this.user.affiliateCode}`
  }

  fetchPrices(): void {
    this.httpService.prices()
    .subscribe(response => this.priceData = response.data);
  }
}

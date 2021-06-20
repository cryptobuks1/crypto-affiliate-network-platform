import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../page.scss']
})
export class DashboardComponent implements OnInit {
  public user: any = {};
  
  constructor(
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.profile();
    this.fetchPrices();
  }

  profile(): void {
    this.httpService.profile().subscribe((response: iHttpResponse) => {
      if(!response.success) {
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      } else {
        this.user = response.data;
      }
    })
  }

  fetchPrices(): void {
    this.httpService.prices()
    .subscribe(response => console.log(response));
  }
}

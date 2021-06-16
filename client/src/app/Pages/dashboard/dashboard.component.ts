import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.profile();
  }

  profile(): void {
    this.httpService.profile().subscribe((response: iHttpResponse) => {
      console.log(response);
    })
  }
}

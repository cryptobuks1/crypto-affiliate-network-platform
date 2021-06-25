import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  public referrals: any[] = [];
  public earnings: any[] = [];
  public filterOption: string = 'htl';
  public user: any | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.myEarnings();
    this.profile();
  }

  
  affiliateLink(): string {
    return `${window.location.origin}/register?ref=${this.user.affiliateCode}`;
  }
  
  profile(): void {
    this.authService.profile().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.user = response.data;
      }
    });
  }

  myEarnings() {
    let unique: any[] = [];
    let used: any[] = [];

    this.authService.myEarnings().subscribe((response: iHttpResponse) => {
      response.data.forEach((item: any) => {
        if(!used.includes(item.cameFrom.username)) {
          used.push(item.cameFrom.username);
          unique.push(item);
        } else {
          let index = unique.findIndex((uitem: any) => uitem.cameFrom.username === item.cameFrom.username)
          unique[index].amount += item.amount;
        }
      });

      this.earnings = unique;
      this.filter('htl');
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


  filter(filterOption: string): any {
    console.log(filterOption);
   switch(filterOption) {
    case 'htl': return this.earnings = this.earnings.sort((a: any, b: any) => b.amount - a.amount)
    case 'lth': return this.earnings = this.earnings.sort((a: any, b: any) => a.amount - b.amount);

    case 'nto': return this.earnings = this.earnings.sort((a: any, b: any) => 
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
    
    case 'otn': return this.earnings = this.earnings.sort((a: any, b: any) => 
        new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf());
    
    default: return [];
   }
  }
}

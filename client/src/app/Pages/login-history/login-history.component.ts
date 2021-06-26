import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss']
})
export class LoginHistoryComponent implements OnInit {
  public loginHistory: any[] | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    window.document.title = 'BNBG | Login History';

    this.fetchHistory();
  }

  fetchHistory(): void {
    this.authService.myHistory().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.loginHistory = response.data.reverse();
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public keepMeLoggedIn: boolean = false;

  constructor(
    private httpService: HttpService, 
    private alertsStoreService: AlertsStoreService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { 
  }

  login(): void {
    this.httpService.login({
      username: this.username,
      password: this.password,
      keepMeLoggedIn: this.keepMeLoggedIn
    }).subscribe(response => {      
      
      this.alertsStoreService.setAlert({ 
        text: response.message, 
        error: !response.success 
      });

      if(response.success) {
        this.authService.setToken(response.data);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}

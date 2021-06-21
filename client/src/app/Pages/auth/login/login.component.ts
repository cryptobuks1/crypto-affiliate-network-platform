import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { VantaService } from 'src/app/Services/vanta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',  '../auth-form.scss']
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public keepMeLoggedIn: boolean = false;

  constructor(
    private vantaService: VantaService,
    private httpService: HttpService, 
    private alertsStoreService: AlertsStoreService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.vantaService.initVanta();
  }

  login(): void {
    this.httpService.login({
      username: this.username,
      password: this.password,
      keepMeLoggedIn: this.keepMeLoggedIn
    }).subscribe(response => {      
      console.log(response);

      this.alertsStoreService.setAlert({ 
        text: response.message, 
        type: `${!response.success ? 'error' : 'success'}`,
        show: true  
      });

      if(response.success) {
        this.authService.setToken(response.data);
        this.router.navigate(['/dashboard/home']);
      }
    });
  }
}

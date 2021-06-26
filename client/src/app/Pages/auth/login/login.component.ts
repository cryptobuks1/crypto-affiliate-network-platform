import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth-form.scss'],
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public keepMeLoggedIn: boolean = false;
  public allowLogins: boolean = false;

  constructor(
    private httpService: HttpService,
    private alertsStoreService: AlertsStoreService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.document.title = 'BNBG | Login';
  }

  resolved(captchaResponse: string) {
    this.httpService.verifyRecaptchaKey(captchaResponse).subscribe((response: any) => {
      if(response.success) {
        this.allowLogins = true;
      } else {
        this.alertsStoreService.setAlert({
          text: 'recaptcha failed',
          type: 'error',
          show: true
        });
      }
    });
  }

  login(): void {
    this.httpService.getLoginDetails().subscribe((response: any) => {
      this.httpService
      .login({
        username: this.username,
        password: this.password,
        keepMeLoggedIn: this.keepMeLoggedIn,
        ipAddr: response.query
      }).subscribe((response) => {
        this.alertsStoreService.setAlert({
          text: response.message,
          type: `${!response.success ? 'error' : 'success'}`,
          show: true,
        });

        if (response.success) {
          this.tokenService.setToken(response.data);
          this.router.navigate(['/dashboard/home']);
        }
      });
    });
  }
}

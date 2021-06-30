import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth-form.scss'],
})
export class RegisterComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public email: string = '';
  public referralCode: string = '';
  public tos: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
    private httpService: HttpService,
    private alertsStoreService: AlertsStoreService
  ) {}

  ngOnInit(): void {
    window.document.title = 'BNBG | Register';

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.ref != undefined) {
        this.referralCode = params.ref;
      }
    });
  }

  register(): void {
    this.httpService.getLoginDetails().subscribe((response: any) => {
      this.httpService
        .register({
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword,
          email: this.email,
          referralCode: this.referralCode,
          tos: this.tos,
          ipAddr: response.ip
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

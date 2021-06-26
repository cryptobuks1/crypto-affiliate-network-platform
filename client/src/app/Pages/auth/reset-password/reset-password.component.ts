import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../auth-form.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public email: string = '';
  public stage: number = 0;
  public password: string = '';
  public confirmPassword: string = '';
  public resetCode: string = '';

  constructor(
    private router: Router,
    private alertsStoreService: AlertsStoreService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    window.document.title = 'BNBG | Reset Password';
  }

  resetPassword(): void {
    this.httpService
      .requestToken({ email: this.email })
      .subscribe((response: iHttpResponse) => {
        if (response.success) {
          this.stage = 1;
        }

        this.alertsStoreService.setAlert({
          text: response.message,
          type: `${response.success ? 'success' : 'error'}`,
          show: true,
        });
      });
  }

  submitCode(): void {
    this.httpService
      .updatePassword({
        resetCode: this.resetCode,
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      .subscribe((response: iHttpResponse) => {
        if (response.success) {
          setTimeout(() => this.router.navigate(['/login']), 2800);
        }
        this.alertsStoreService.setAlert({
          text: response.message,
          show: true,
          type: `${response.success ? 'success' : 'error'}`,
        });
      });
  }
}

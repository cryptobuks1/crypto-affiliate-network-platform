import { Component, OnInit } from '@angular/core';
import { countries } from './countries';
import { AuthService } from 'src/app/Services/auth.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  public countries: any[];
  public formData: any | undefined;
  public tokenSent: boolean = false;
  public token: string | undefined;
  public passwordFormData: any = {
    newPassword: '',
    confirmNewPassword: '',
  };

  public emailFormData: any = {
    newEmail: '',
    confirmNewEmail: '',
  };

  public user: any | undefined;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService,
    private alertsStoreService: AlertsStoreService
  ) {
    this.countries = countries;
  }

  ngOnInit(): void {
    window.document.title = 'BNBG | Account Settings';

    this.fetchUser();
  }

  fetchUser(): void {
    this.authService
      .myPersonalDetails()
      .subscribe((response: iHttpResponse) => {
        this.formData = response.data;
      });

    this.authService.profile().subscribe((response: iHttpResponse) => {
      this.user = response.data;
    });
  }

  submitToken(): void {
    if (this.token !== undefined) {
      this.authService
        .verifyEmail(this.token)
        .subscribe((response: iHttpResponse) => {
          this.alertsStoreService.setAlert({
            text: response.message,
            type: `${response.success ? 'success' : 'error'}`,
            show: true,
          });

          if (response.success) {
            this.user.emailVerified = true;
          }
        });
    }
  }

  submit(): void {
    delete this.formData.createdAt;
    delete this.formData.belongsTo;

    this.authService
      .updateMyPersonalDetails({
        ...this.formData,
        updatedAt: new Date(),
        affiliateCode: this.user.affiliateCode,
      })
      .subscribe((response: iHttpResponse) => {
        this.alertsStoreService.setAlert({
          type: `${response.success ? 'success' : 'error'}`,
          text: response.message,
          show: true,
        });
      });
  }

  updatePassword(): void {
    this.authService
      .updatePassword(this.passwordFormData)
      .subscribe((response: iHttpResponse) => {
        this.alertsStoreService.setAlert({
          text: response.message,
          type: `${response.success ? 'success' : 'error'}`,
          show: true,
        });

        if (response.success) {
          setTimeout(() => {
            this.tokenService.clearToken();
            this.router.navigate(['/login']);
          }, 3000);
        }
      });
  }

  updateEmail(): void {
    if (this.emailFormData !== undefined) {
      this.authService
        .updateEmail(this.emailFormData)
        .subscribe((response: iHttpResponse) => {
          if (response.success) {
            this.fetchUser();
          }

          this.alertsStoreService.setAlert({
            text: response.message,
            type: `${response.success ? 'success' : 'error'}`,
            show: true,
          });
        });
    }
  }

  setToken() {
    this.authService.setToken().subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.tokenSent = true;
      }

      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'success' : 'error'}`,
        show: true,
      });
    });
  }
}

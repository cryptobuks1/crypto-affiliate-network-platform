import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public email: string = '';
  public referralCode: string = '';
  public tos: boolean = false;

  constructor(
    private httpService: HttpService,
    private alertsStoreService: AlertsStoreService) { }

  ngOnInit(): void {
  } 
 

  register(): void {
    this.httpService.register({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      email: this.email,
      referalCode: this.referralCode,
      tos: this.tos
    }).subscribe(response => {
      this.alertsStoreService.setAlert({
        text: response.message,
        error: !response.success
      });
    });
  }
}

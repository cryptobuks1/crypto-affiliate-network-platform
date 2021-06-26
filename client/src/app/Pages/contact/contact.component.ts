import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../page.scss']
})
export class ContactComponent implements OnInit {
  public loading: boolean = false;
  public formData: any = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private httpService: HttpService, 
    private alertsStoreService: AlertsStoreService) {}

  ngOnInit(): void {
    window.document.title = 'BNBG | Contact';
  }

  contact(): void {
    this.loading = true;
    this.httpService.contact(this.formData).subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.formData = { 
          name: '', 
          email: '', 
          message: '' 
        };
      } 

      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'success' : 'error'}`,
        show: true
      });

      this.loading = false;
    });
  }
}

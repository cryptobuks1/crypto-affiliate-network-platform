import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AdminService } from 'src/app/Services/admin.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss']
})
export class AdminContactComponent implements OnInit {
  public messages: any[] | undefined;

  constructor(
    private adminService: AdminService,
    private alertsStoreService: AlertsStoreService
  ) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.adminService.getMessages().subscribe((response: iHttpResponse) => {
        if(response.success) {
          this.messages = response.data;
        }
        
        console.log(response.data);
    });  
  }

  resolve(id: string) {
    const update = {
      responded: true
    }

    this.adminService.updateMessage({ id, update }).subscribe((response: iHttpResponse) => {
      if(response.success) {
        let msg = this.messages?.find((msg: any) => msg._id === id)
        msg.responded = true;
      }

      this.alertsStoreService.setAlert({
        type: `${response.success ? 'success' : 'error'}`,
        text: response.message,
        show: true
      });
    });
  }
}

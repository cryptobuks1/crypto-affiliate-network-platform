import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-admin-announcements',
  templateUrl: './admin-announcements.component.html',
  styleUrls: ['./admin-announcements.component.scss']
})
export class AdminAnnouncementsComponent implements OnInit {
  public announcement: any = {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    backgroundColor: '#333',
    textColor: '#fff',
    active: false
  };

  constructor(
    private alertsStoreService: AlertsStoreService,
    private adminService: AdminService) {}

  ngOnInit(): void {
  }

  save(): void {
    this.adminService.setAnnouncement(this.announcement)
      .subscribe((response: iHttpResponse) => {
          this.alertsStoreService.setAlert({
            text: response.message,
            type: `${response.success ? 'success' : 'error'}`,
            show: true
          });
      });
  }
}

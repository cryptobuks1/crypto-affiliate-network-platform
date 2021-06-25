import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { serverAddr } from 'src/app/Services/settings';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-admin-kyc-requests',
  templateUrl: './admin-kyc-requests.component.html',
  styleUrls: ['./admin-kyc-requests.component.scss']
})
export class AdminKycRequestsComponent implements OnInit {

  public requests: any[] | undefined;
  constructor(
    private alertsStoreService: AlertsStoreService,
    private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchKycs();
  }

  fetchKycs(): void {
    this.adminService.getKycs().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.requests = response.data;
        console.log(response.data);
      }
    });
  }

  getURL(img: string): string {
    return `${serverAddr}/uploads/${img}`;
  }

  reject(id: string): void {
    this.adminService.rejectKyc({ id }).subscribe((response: iHttpResponse) => {
      if(response.success) {
        if(this.requests !== undefined) {
            let request = this.requests?.find((request: any) => request._id === id);
            request.status = 'rejected';
        }
      }

      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'info' : 'error'}`,
        show: true
      });
    });
  } 

  approve(id: string): void {
    this.adminService.approveKyc({ id }).subscribe((response: iHttpResponse) => {
      if(response.success) {
        if(this.requests !== undefined) {
            let request = this.requests?.find((request: any) => request._id === id);
            request.status = 'approved';
        }
      }

      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'info' : 'error'}`,
        show: true
      });
    });
  }
}

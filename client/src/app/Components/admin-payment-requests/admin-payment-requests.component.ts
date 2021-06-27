import { Component, OnInit } from '@angular/core';
import { serverAddr } from 'src/app/Services/settings';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-admin-payment-requests',
  templateUrl: './admin-payment-requests.component.html',
  styleUrls: ['./admin-payment-requests.component.scss']
})
export class AdminPaymentRequestsComponent implements OnInit {
  public requests: any[] | undefined;
  public filterByStatusValue: string = 'all';
  public amountRendered: number = 10;
  public nProducts: number = 1;

  constructor(
    private alertsStoreService: AlertsStoreService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchRequests(); 
  }

  getURL(img: string): string {
    return `${serverAddr}/uploads/${img}`;
  }

  fetchRequests(): void {
    this.adminService.requestsSlice(this.amountRendered * this.nProducts, this.filterByStatusValue)
    .subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.requests = response.data;
      }
    });
  } 

  loadMore(): void {
    this.nProducts += 1;
    this.fetchRequests();
  }

  changeAmount(): void {
    this.fetchRequests();
  }

  approve(id: string, amount: number): void {
    this.adminService
      .approve({ id, amount })
      .subscribe((response: iHttpResponse) => {
        if (response.success) {
          let request = this.requests?.find((request: any) => request._id === id);
          request.approved = true;
          request.status = 'approved';
        }

        this.alertsStoreService.setAlert({
          text: response.message,
          type: `${response.success ? 'success' : 'error'}`,
          show: true,
        });
      });
  }

  reject(id: string): void {
    this.adminService.reject({ id }).subscribe((response: iHttpResponse) => {
      if (response.success) {
        let request = this.requests?.find((request: any) => request._id === id);
        request.approved = false;
        request.status = 'rejected';
      }
      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'success' : 'error'}`,
        show: true,
      });
    });
  }


  filterByStatus(): void {
    this.nProducts = 1;
    this.fetchRequests();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { serverAddr } from 'src/app/Services/settings';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  private __ngContext__: any;
  public requests: any[] | undefined;

  constructor(
    private alertsStoreService: AlertsStoreService,
    public adminService: AdminService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      if (!response.data) {
        this.router.navigate(['/']);
      }

      this.fetchRequests();
    });
  }

  togglePanel(clickedIndex: number): void {
    if (this.requests != undefined) {
      this.requests.forEach(
        (request: any, i: number) =>
          (request.expanded =
            clickedIndex != i ? false : !request.expanded ? true : false)
      );
    }
  }

  getURL(img: string): string {
    return `${serverAddr}/uploads/${img}`;
  }

  fetchRequests(): void {
    this.adminService.requests().subscribe((response: iHttpResponse) => {
      if (response.success) {
        console.log(response.data);
        this.requests = response.data;
      }
    });
  }

  approve(id: string): void {
    this.adminService.approve({ id }).subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.fetchRequests();
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
        this.fetchRequests();
      }
      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'success' : 'error'}`,
        show: true,
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { serverAddr } from 'src/app/Services/settings';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  private __ngContext__: any;
  public requests: any[] | undefined;

  constructor(
    public adminService: AdminService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.__ngContext__[0].querySelector('.page-title').textContent =
      'Administration';

    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      if (!response.data) {
        this.router.navigate(['/']);
      }

      this.fetchRequests();
    });
  }

  getURL(img: string): string {
    return `${serverAddr}/uploads/${img}`;
  }

  fetchRequests(): void {
    this.adminService.requests().subscribe((response: iHttpResponse) => {
      if (response.success) {
        console.log(response.data);
        this.requests = response.data.map((request: any) => {
          request.expanded = false;
          return request;
        });
      }
    });
  }

  reject(id: string): void {
    console.log('reject', id);
  }

  approve(id: string): void {
    console.log('approve', id);
  }
}

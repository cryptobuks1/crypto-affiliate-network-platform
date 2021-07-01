import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  public tab: number = 5;
  
  constructor(
    public adminService: AdminService, 
    private router: Router) {
  }

  ngOnInit(): void {
    window.document.title = 'BNBG | Administration';

    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      if (!response.data) {
        this.router.navigate(['/dashboard/home']);
      } 
    });
  }
}

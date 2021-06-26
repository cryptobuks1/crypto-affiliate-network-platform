import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { FormControl } from '@angular/forms';
import { StreamService } from 'src/app/Services/stream.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  public selected: FormControl = new FormControl(0);
  public tabs: number[] = [0, 1, 2, 3, 4];
  private socket: any | undefined;
  
  constructor(
    private streamService: StreamService,
    public adminService: AdminService, 
    private router: Router) {
      this.socket = streamService.getSocket();
  }

  ngOnInit(): void {
    window.document.title = 'BNBG | Administration';

    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      if (!response.data) {
        this.router.navigate(['/']);
      } else {
        this.checkIfTabExists();
      }
    });
  }

  checkIfTabExists(): void {
    let tab = window.location.hash.split('?tab=')[1];

    if(tab !== undefined && this.tabs.includes(parseInt(tab))) {
      this.selected.setValue(tab);
    }
  }

  changeTab(tab: number) {
    
    this.selected.setValue(tab);
    const newURL = `/#/dashboard/administration?tab=${this.selected.value}`
    window.history.pushState(null, '', newURL);
  }
}

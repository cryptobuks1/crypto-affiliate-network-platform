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
  public tabs: number[] = [0, 1, 2, 3];
  private socket: any | undefined;
  
  constructor(
    private streamService: StreamService,
    public adminService: AdminService, 
    private router: Router) {
      this.socket = streamService.getSocket();
  }

  ngOnInit(): void {
    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      if (!response.data) {
        this.router.navigate(['/']);
      } else {
        this.checkIfTabExists();
      }
    });
  }

  checkIfTabExists(): void {
    let search = new URLSearchParams(window.location.search);
    let tab = search.get('tab');

    if(tab !== null && this.tabs.includes(parseInt(tab))) {
      this.selected.setValue(tab);
    }
  }

  changeTab(e: Event) {
    this.selected.setValue(e);
    const newURL = window.location.pathname + '?tab='  + this.selected.value;
    window.history.pushState(null, '', newURL);
  }
}

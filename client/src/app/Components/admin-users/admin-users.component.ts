import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  public users: any[] | undefined;
  public changedUsers: any[] = [];

  constructor(
    private alertsStoreService: AlertsStoreService,
    private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.findUsers().subscribe((response: iHttpResponse) => {
      if(response.success) {
        console.log(response.data);
        this.users = response.data;
      }
    });
  }

  addToChangedUsers(uid: number): void {
    if(this.users !== undefined && !this.changedUsers.includes(uid)) {
      this.changedUsers.push(uid);
    }
  }

  constructData(): any[] {
    let usersToChange: any[] = [];
    
    if(this.users !== undefined) {
      for(let i = 0; i < this.changedUsers.length; i++) {
        for(let j = 0; j < this.users.length; j++) {
          if(this.changedUsers[i] === this.users[j]._id) {
            usersToChange.push({
              _id: this.users[j]._id,
              update: {
                percentage: this.users[j].percentage
              }
            });
          }
        }
      }
    }
    return usersToChange;
  }

  save(): void {
    let data: any[] = this.constructData();

    this.adminService.bulkUpdate(data).subscribe((response: iHttpResponse) => {
        this.alertsStoreService.setAlert({
          text: response.message,
          type: `${response.success ? 'success' : 'error'}`,
          show: true
        });
    })
  }
}

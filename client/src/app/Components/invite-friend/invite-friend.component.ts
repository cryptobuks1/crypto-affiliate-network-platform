import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.scss']
})
export class InviteFriendComponent implements OnInit {
  public email: string | undefined;
  public user: any | undefined;

  constructor(
    private alertsStoreService: AlertsStoreService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.profile();
  }

  profile() {
    this.authService.profile().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.user = response.data;
      }
    });
  }

  affiliateLink(): string {
    return `${window.location.origin}/register?ref=${this.user.affiliateCode}`;
  }

  inviteFriend(): void {
    this.authService
      .inviteFriend({ email: this.email })
      .subscribe((response: iHttpResponse) => {
        if (response.success) {
          this.email = '';
        }

        this.alertsStoreService.setAlert({
          text: response.message,
          show: true,
          type: `${response.success ? 'info' : 'error'}`,
        });
      });
  }
}

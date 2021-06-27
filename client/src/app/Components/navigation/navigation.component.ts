import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { StreamService } from 'src/app/Services/stream.service';
import { BalanceStoreService } from 'src/app/Store/balance-store.service';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public navState: boolean = false;
  public user: any | undefined;
  private socket: any | undefined;
  public onlineNow: number = 0;
  public isAdmin: boolean = false;

  constructor(
    private adminService: AdminService,
    private balanceStore: BalanceStoreService,
    private streamService: StreamService,
    private authService: AuthService,
    private router: Router,
    public tokenService: TokenService) {
      this.socket = this.streamService.getSocket();

      this.router.events.subscribe((e: any) => {
        if(e instanceof NavigationEnd) {
          this.navState = false;
          this.profile(); 
        }
      });
  }

  ngOnInit(): void {
    this.streamState();
    this.getIsAdmin();
    this.profile();
    this.socket.on('broadcast online', (data: any) => this.onlineNow = data);
    this.balanceStore.getBalance().subscribe((newBalance: number) => this.user.balance = newBalance);
  }

  profile(): void {
    this.authService.profile().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.user = response.data;
      }
      console.log(this.user);
    });
  }

  streamState(): void {
    this.adminService.streamState().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.onlineNow = response.data.online;
      }
    });
  }

  logout(): void {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
  }

  roundInt(int: number): number | string {
    if (int != undefined) {
      let numWithZeroes = int.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
      });
      return numWithZeroes;
    }

    return 0;
  }

  getIsAdmin() {
    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      this.isAdmin = response.data;
    });
  }
}

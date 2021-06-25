import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { StreamService } from 'src/app/Services/stream.service';

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

  constructor(
    private streamService: StreamService,
    private authService: AuthService,
    private router: Router,
    public tokenService: TokenService) {
      this.socket = streamService.getSocket();
  }

  ngOnInit(): void {
    this.router.events.subscribe((e: any) => {
      this.navState = false;
      this.profile();
    });

    this.profile();

    this.socket.on('broadcast online', (data: any) => {
      this.onlineNow = data;
    });
  }

  profile(): void {
    this.authService.profile().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.user = response.data;
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
}

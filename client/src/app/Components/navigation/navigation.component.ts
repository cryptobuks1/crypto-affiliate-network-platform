import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public navState: boolean = false;

  constructor(private router: Router, public tokenService: TokenService) {}

  ngOnInit(): void {
    this.router.events.subscribe((e: any) => {
      this.navState = false;
    });
  }

  logout(): void {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
  }
}

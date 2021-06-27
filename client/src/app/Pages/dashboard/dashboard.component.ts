import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../page.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {
    window.addEventListener('resize', this.fixPadding);

    if (window.location.pathname === '/dashboard')
      this.router.navigate(['/dashboard/home']);
  }

  ngOnInit() {
    this.fixPadding();
  }

  fixPadding(): void {
    let content = document.querySelector<Element>('.dashboard-content') as HTMLElement;
    let dashboardNav: Element | null = document.querySelector<Element>('.dashboard-nav');

    if (content !== null && dashboardNav !== null) {
      content.style.paddingTop =
        dashboardNav.getBoundingClientRect().height + 'px';
    }
  }
}

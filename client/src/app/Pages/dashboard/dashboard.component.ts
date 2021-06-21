import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../page.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
    window.addEventListener('resize', this.fixPadding);
  }
  
  ngOnInit() {
    this.fixPadding();
  }

  fixPadding(): void {
    let content = document.querySelector<Element>('.dashboard-content') as HTMLElement;
    let dashboardNav: Element | null = document.querySelector<Element>('.dashboard-nav');

    if(content != null && dashboardNav != null) {
      content.style.paddingTop = dashboardNav.getBoundingClientRect().height + 'px';
    }
  }
}

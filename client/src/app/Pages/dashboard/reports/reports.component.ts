import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss', '../../page.scss']
})
export class ReportsComponent implements OnInit {
  private __ngContext__: any;

  constructor() {}

  ngOnInit(): void {
    this.__ngContext__[0].querySelector('.page-title').textContent = 'Reports'
  }

}

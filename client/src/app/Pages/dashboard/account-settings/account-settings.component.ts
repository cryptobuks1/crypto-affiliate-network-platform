import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  private __ngContext__: any;

  constructor() {}

  ngOnInit(): void {
    this.__ngContext__[0].querySelector('.page-title').textContent =
      'Account Settings';
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { iAlert } from 'src/app/Interfaces/alert.interface';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  public alert: iAlert = { text: 'Big Error!', type: 'error', show: false };

  constructor(private alertsStoreService: AlertsStoreService) {}

  ngOnInit(): void {
    this.alertsStoreService.getAlert().subscribe((alert: iAlert) => {
      this.alert = alert;
      setTimeout(() => {
        alert.show = false;
      }, 3000);
    });
  }
}

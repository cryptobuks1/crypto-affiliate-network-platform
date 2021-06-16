import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { iAlert } from 'src/app/Interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertsStoreService {
  private alertsStore = new Subject<iAlert>();

  constructor() { }

  public setAlert(alert: iAlert) {
    return this.alertsStore.next(alert);
  }

  public getAlert(): Observable<iAlert> {
    return this.alertsStore.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceStoreService {
  private balanceStore = new Subject<number>();

  constructor() { }

  public setBalance(newBalance: number) {
    return this.balanceStore.next(newBalance);
  }

  public getBalance(): Observable<number> {
    return this.balanceStore.asObservable();
  }
}

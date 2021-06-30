import { Component, OnInit } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { BalanceStoreService } from 'src/app/Store/balance-store.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {
  public user: any | undefined;
  public amount: number | undefined = 1;
  public asset: string | undefined = 'bitcoin';
  public loading: boolean = false;
  public withdrawals: any[] | undefined;
  public withdrawalsStore: any[] | undefined;
  public walletAddr: any | undefined;
  public filterValue: string | undefined = 'pending';
  public pendingWithdrawalsBalance: number = 0;
  public showWithdrawalHistory: boolean = false;
  
  constructor(
    private alertsStoreService: AlertsStoreService,
    private balanceStore: BalanceStoreService,
    private authService: AuthService) {}

  ngOnInit(): void {
    window.document.title = 'BNBG | Withdrawals';

    this.profile();
    this.fetchMyWithdrawals();
  }

  profile() {
    this.authService.profile().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.user = response.data;
      }
    })
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  
  calcPendingBalance(): void {
    let val = 0;
    this.withdrawalsStore?.forEach((withdrawal: any) => {
      if(withdrawal.status === 'pending') {
        val += withdrawal.amount;
      }
    });

    this.pendingWithdrawalsBalance = val;
  }

  requestWithdrawal(): void {
    const data = {
      amount: this.amount,
      asset: this.asset,
      walletAddr: this.walletAddr
    };

    this.authService.requestWithdrawal(data).subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.user.balance -= response.data.amount;
        this.withdrawals?.push(response.data);
        this.withdrawalsStore?.push(response.data);
        this.balanceStore.setBalance(this.user.balance);
      }

      this.alertsStoreService.setAlert({
        type: `${response.success ? 'success' : 'error'}`,
        text: response.message,
        show: true
      });
      this.calcPendingBalance();
    });
  }

  fetchMyWithdrawals(): void {
    this.authService.myWithdrawals().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.withdrawalsStore = response.data;
        this.filter();
        this.calcPendingBalance();
      }
    });
  }

  cancelWithdrawal(id: string): void {
    this.authService.cancelWithdrawal({ id }).subscribe((response: iHttpResponse) => {
      if(response.success) {
          let withdrawal = this.withdrawals?.find((withdrawal: any) => withdrawal._id === id);
          this.user.balance += withdrawal.amount;
          this.withdrawals?.splice(this.withdrawals.findIndex((withdrawal: any) => withdrawal._id === id), 1);
          this.withdrawalsStore?.splice(this.withdrawalsStore.findIndex((withdrawal: any) => withdrawal._id === id), 1);
          this.balanceStore.setBalance(this.user.balance);
      }
      
      this.alertsStoreService.setAlert({
        type: `${response.success ? 'success' : 'error'}`,
        text: response.message,
        show: true
      });
      this.calcPendingBalance();
    });
  }

  filter() {
    this.withdrawals = this.withdrawalsStore?.filter((withdrawal: any) => {
      return withdrawal.status === this.filterValue;
    });
  }

  roundInt(int: number): number | string {
    if (int != undefined) {
      let numWithZeroes = int.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
      });
      return numWithZeroes;
    }

    return '0';
  }
}

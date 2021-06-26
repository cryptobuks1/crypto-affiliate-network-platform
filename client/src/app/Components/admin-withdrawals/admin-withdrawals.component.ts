import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-admin-withdrawals',
  templateUrl: './admin-withdrawals.component.html',
  styleUrls: ['./admin-withdrawals.component.scss']
})
export class AdminWithdrawalsComponent implements OnInit {
  public withdrawals: any[] | undefined;
  private withdrawalsStore: any[] | undefined;
  public filterValue: string | undefined = 'pending';

  constructor(
    private adminService: AdminService,
    private alertsStoreService: AlertsStoreService
  ) {}

  ngOnInit(): void {
    this.fetchWithdrawals();
  }

  approve(id: string) {
    this.adminService.approveWithdrawal({ id }).subscribe((response: iHttpResponse) => {
      if(response.success) {
        let withdrawal = this.withdrawals?.find((withdrawal: any) => withdrawal._id === id);
        withdrawal.status = 'approved';
        withdrawal.completed = true;
      }

      this.alertsStoreService.setAlert({
        type: `${response.success ? 'success' : 'error'}`,
        show: true,
        text: response.message
      });
    });
  }

  filter() {
    this.withdrawals = this.withdrawalsStore?.filter((withdrawal: any) => {
      return withdrawal.status === this.filterValue;
    });
  }

  reject(id: string) {
    this.adminService.rejectWithdrawal({ id }).subscribe((response: iHttpResponse) => {
      if(response.success) {
        let withdrawal = this.withdrawals?.find((withdrawal: any) => withdrawal._id === id);
        withdrawal.status = 'rejected';
        withdrawal.completed = true;
      }

      this.alertsStoreService.setAlert({
        type: `${response.success ? 'success' : 'error'}`,
        show: true,
        text: response.message
      });
    });
  }

  fetchWithdrawals(): void {
    this.adminService.getWithdrawals().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.withdrawalsStore = response.data;
        this.filter();
      }
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

    return 0;
  }
}

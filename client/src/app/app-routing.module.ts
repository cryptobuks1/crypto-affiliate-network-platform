import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { NotAuthGuard } from './Guards/not-auth.guard';

import { HomeComponent } from './Pages/home/home.component';
import { ContactComponent } from './Pages/contact/contact.component';

import { LoginComponent } from './Pages/auth/login/login.component';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { ResetPasswordComponent } from './Pages/auth/reset-password/reset-password.component';

import { DashboardHomeComponent } from './Pages/dashboard/home/dashboard.component';
import { ClaimBuyComponent } from './Pages/dashboard/claim-buy/claim-buy.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ReportsComponent } from './Pages/dashboard/reports/reports.component';
import { AccountSettingsComponent } from './Pages/dashboard/account-settings/account-settings.component';
import { AdministrationComponent } from './Pages/administration/administration.component';
import { IdentityVerificationComponent } from './Pages/identity-verification/identity-verification.component';
import { LoginHistoryComponent } from './Pages/login-history/login-history.component';
import { WithdrawalComponent } from './Pages/withdrawal/withdrawal.component';
import { LearnComponent } from './Pages/learn/learn.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [NotAuthGuard] },
  { path: 'identity-verification', component: IdentityVerificationComponent, canActivate: [AuthGuard] },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'claim-buy', component: ClaimBuyComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'login-history', component: LoginHistoryComponent },
      { path: 'withdrawal', component: WithdrawalComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

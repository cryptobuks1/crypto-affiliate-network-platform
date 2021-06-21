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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent, canActivate: [ NotAuthGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ NotAuthGuard ] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [ NotAuthGuard ] },
  
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [ AuthGuard ],
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'claim-buy', component: ClaimBuyComponent },
      { path: 'reports', component: ReportsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
 
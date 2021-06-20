import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { NotAuthGuard } from './Guards/not-auth.guard';

import { HomeComponent } from './Pages/home/home.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { ReportsComponent } from './Pages/reports/reports.component';
import { ResetPasswordComponent } from './Pages/auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [ NotAuthGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ NotAuthGuard ] },
  { path: 'reports', component: ReportsComponent, canActivate: [ AuthGuard ] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [ NotAuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
 
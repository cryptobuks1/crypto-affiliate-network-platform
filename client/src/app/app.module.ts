import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { ReportsComponent } from './Pages/reports/reports.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { HomeComponent } from './Pages/home/home.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { ResetPasswordComponent } from './Pages/auth/reset-password/reset-password.component';
import { AlertsComponent } from './Components/alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ReportsComponent,
    ContactComponent,
    HomeComponent,
    NavigationComponent,
    ResetPasswordComponent,
    AlertsComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

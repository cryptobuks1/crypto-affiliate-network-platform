import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { HomeComponent } from './Pages/home/home.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { ResetPasswordComponent } from './Pages/auth/reset-password/reset-password.component';
import { AlertsComponent } from './Components/alerts/alerts.component';
import { ModalComponent } from './Components/modal/modal.component';
import { NewsTickerComponent } from './Components/news-ticker/news-ticker.component';

import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ClaimBuyComponent } from './Pages/dashboard/claim-buy/claim-buy.component';
import { DashboardHomeComponent } from './Pages/dashboard/home/dashboard.component';
import { ReportsComponent } from './Pages/dashboard/reports/reports.component';
import { DashboardNavComponent } from './Components/dashboard-nav/dashboard-nav.component';
import { AdministrationComponent } from './Pages/dashboard/administration/administration.component';
import { AccountSettingsComponent } from './Pages/dashboard/account-settings/account-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardHomeComponent,
    LoginComponent,
    RegisterComponent,
    ReportsComponent,
    ContactComponent,
    HomeComponent,
    NavigationComponent,
    ResetPasswordComponent,
    AlertsComponent,
    ModalComponent,
    NewsTickerComponent,
    ClaimBuyComponent,
    DashboardComponent,
    DashboardNavComponent,
    AdministrationComponent,
    AccountSettingsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

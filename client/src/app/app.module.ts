import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

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
import { IdentityVerificationComponent } from './Pages/identity-verification/identity-verification.component';
import { LiveChatComponent } from './Components/live-chat/live-chat.component';

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
    IdentityVerificationComponent,
    LiveChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRippleModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

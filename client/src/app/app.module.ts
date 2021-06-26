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
import { MatSliderModule } from '@angular/material/slider';
import { NgxEchartsModule } from 'ngx-echarts';
import { RecaptchaModule } from "ng-recaptcha";

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
import { AdminLiveChatComponent } from './Components/admin-live-chat/admin-live-chat.component';
import { AdminPaymentRequestsComponent } from './Components/admin-payment-requests/admin-payment-requests.component';
import { AdminKycRequestsComponent } from './Components/admin-kyc-requests/admin-kyc-requests.component';
import { AdminContactComponent } from './Components/admin-contact/admin-contact.component';
import { LoginHistoryComponent } from './Pages/login-history/login-history.component';
import { WithdrawalComponent } from './Pages/withdrawal/withdrawal.component';
import { AdminWithdrawalsComponent } from './Components/admin-withdrawals/admin-withdrawals.component';

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
    AdminLiveChatComponent,
    AdminPaymentRequestsComponent,
    AdminKycRequestsComponent,
    AdminContactComponent,
    LoginHistoryComponent,
    WithdrawalComponent,
    AdminWithdrawalsComponent,
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
    MatSliderModule,
    RecaptchaModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

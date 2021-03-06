import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iHttpResponse } from '../Interfaces/http.interface';
import { Observable } from 'rxjs';
import { serverAddr } from './settings';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverAddr: string = `${serverAddr}/api/users`;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient
  ) {}

  profile(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/profile`, { 
      headers: this.tokenService.headers() 
    });
  }

  upload(data: FormData): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/upload`, data, { 
      headers: this.tokenService.headers() 
    });
  }

  requestMoney(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/request-money`, data, { 
      headers: this.tokenService.headers() 
    });
  }

  myReferrals(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/my-referrals`, { 
      headers: this.tokenService.headers() 
    });
  }

  myRequests(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/my-requests`, { 
      headers: this.tokenService.headers() 
    });
  }

  myPersonalDetails(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/profile/personal`, { 
      headers: this.tokenService.headers() 
    });
  }

  updateMyPersonalDetails(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/profile/personal`, data, { 
      headers: this.tokenService.headers() 
    });
  }

  updatePassword(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/profile/update-password`, data, { 
        headers: this.tokenService.headers() 
    });
  }

  setToken(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/profile/set-token`, { 
        headers: this.tokenService.headers() 
    });
  }

  verifyEmail(token: string): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/profile/verify-email`, { token }, { 
        headers: this.tokenService.headers() 
    });
  }

  updateEmail(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/profile/update-email`, data, { 
      headers: this.tokenService.headers() 
    });
  }

  balanceHistory(data: any): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/dashboard/balance-history`, { 
      headers: this.tokenService.headers() 
    });
  }

  inviteFriend(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/dashboard/invite-friend`, data, { 
        headers: this.tokenService.headers() 
    });
  }

  newKycRequest(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/dashboard/kyc-request `, data, { 
      headers: this.tokenService.headers() 
    });
  }

  myKyc(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/dashboard/my-kyc`, { 
        headers: this.tokenService.headers() 
    });
  }

  myEarnings(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/my-earnings`, { 
      headers: this.tokenService.headers() 
    });
  }

  myHistory(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/my-history`, {
      headers: this.tokenService.headers()
    });
  }

  myWithdrawals(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/my-withdrawals`, {
      headers: this.tokenService.headers()
    });
  }

  requestWithdrawal(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/request-withdrawal`, data, {
      headers: this.tokenService.headers()
    });
  }

  cancelWithdrawal(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/cancel-withdrawal`, data, {
      headers: this.tokenService.headers()
    });
  }
}

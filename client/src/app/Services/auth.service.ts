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
      headers: this.tokenService.headers(),
    });
  }

  upload(data: FormData): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(
      `${this.serverAddr}/upload`,
      data,
      { headers: this.tokenService.headers() }
    );
  }

  requestMoney(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(
      `${this.serverAddr}/request-money`,
      data,
      {
        headers: this.tokenService.headers(),
      }
    );
  }

  myReferrals(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(
      `${this.serverAddr}/my-referrals`,
      {
        headers: this.tokenService.headers(),
      }
    );
  }

  myRequests(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(
      `${this.serverAddr}/my-requests`,
      {
        headers: this.tokenService.headers(),
      }
    );
  }

  myPersonalDetails(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(
      `${this.serverAddr}/profile/personal`,
      { headers: this.tokenService.headers() }
    );
  }

  updateMyPersonalDetails(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(
      `${this.serverAddr}/profile/personal`,
      data,
      { headers: this.tokenService.headers() }
    );
  }

  updatePassword(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(
      `${this.serverAddr}/profile/update-password`,
      data,
      { headers: this.tokenService.headers() }
    );
  }
}

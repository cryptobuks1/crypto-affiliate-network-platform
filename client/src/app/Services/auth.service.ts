import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { iHttpResponse } from '../Interfaces/http.interface';
import { Observable } from 'rxjs';
import { serverAddr } from './settings';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverAddr: string = `${serverAddr}/api/users`;

  constructor(private httpClient: HttpClient) {}

  setToken(token: string): void {
    return localStorage.setItem('token', token);
  }

  clearToken(): void {
    return localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  loggedIn(): boolean {
    const isExpired = helper.isTokenExpired(this.getToken() || '');

    if (isExpired) {
      localStorage.removeItem('token');
    }

    return !isExpired;
  }

  headers(): any {
    return { Authorization: this.getToken() };
  }

  profile(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/profile`, {
      headers: this.headers(),
    });
  }

  upload(data: FormData): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(
      `${this.serverAddr}/upload`,
      data,
      { headers: this.headers() }
    );
  }

  requestMoney(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(
      `${this.serverAddr}/request-money`,
      data,
      {
        headers: this.headers(),
      }
    );
  }

  myReferrals(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(
      `${this.serverAddr}/my-referrals`,
      {
        headers: this.headers(),
      }
    );
  }
}

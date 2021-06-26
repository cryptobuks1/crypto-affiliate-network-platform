import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iHttpResponse } from '../Interfaces/http.interface';
import { serverAddr } from './settings';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private serverAddr: string = `${serverAddr}/api/admin`;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient
  ) {}

  isAdmin(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}`, {
      headers: this.tokenService.headers()
    });
  }

  requests(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/requests`, {
      headers: this.tokenService.headers()
    });
  }

  approve(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/approve`, data, { 
      headers: this.tokenService.headers() 
    });
  }

  reject(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/reject`, data, { 
      headers: this.tokenService.headers() 
    });
  }

  getChats(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/get-chats`, {
      headers: this.tokenService.headers()
    });
  }

  getKycs(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/get-kycs`, {
      headers: this.tokenService.headers()
    });
  }

  approveKyc(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/approve-kyc`, data, {
      headers: this.tokenService.headers()
    });
  }

  rejectKyc(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/reject-kyc`, data, {
      headers: this.tokenService.headers()
    });
  }

  getMessages(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/messages`, {
      headers: this.tokenService.headers()
    });
  }

  updateMessage(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/update-message`, data, {
      headers: this.tokenService.headers()
    });
  }

  getWithdrawals(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/get-withdrawals`, {
      headers: this.tokenService.headers()
    });
  }

  approveWithdrawal(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/approve-withdrawal`, data, {
      headers: this.tokenService.headers()
    })
  }

  rejectWithdrawal(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/reject-withdrawal`, data, {
      headers: this.tokenService.headers()
    })
  }
}

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
      headers: this.tokenService.headers(),
    });
  }

  requests(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/requests`, {
      headers: this.tokenService.headers(),
    });
  }

  approve(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(
      `${this.serverAddr}/approve`,
      data,
      { headers: this.tokenService.headers() }
    );
  }

  reject(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(
      `${this.serverAddr}/reject`,
      data,
      { headers: this.tokenService.headers() }
    );
  }
}

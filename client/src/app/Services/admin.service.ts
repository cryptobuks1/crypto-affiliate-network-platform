import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iHttpResponse } from '../Interfaces/http.interface';
import { AuthService } from './auth.service';
import { serverAddr } from './settings';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private serverAddr: string = `${serverAddr}/api/admin`;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  isAdmin(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}`, {
      headers: this.authService.headers(),
    });
  }

  requests(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/requests`, {
      headers: this.authService.headers(),
    });
  }
}

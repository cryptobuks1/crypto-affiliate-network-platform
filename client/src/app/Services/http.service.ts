import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private serverAddr: string = 'http://localhost:3000/api';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) {}

  headers(): any  {
    return { 'Authorization': this.authService.getToken() }
  }

  login(data: any): Observable<iHttpResponse> {
      return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/sign-in`, data);
  }

  register(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/sign-up`, data);
  }

  profile(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/users/profile`, { headers: this.headers() });
  }

  prices(): Observable<any> {
    return this.httpClient.get<any>('https://api.pancakeswap.info/api/v2/tokens/0x6509c95b1ac498390e40eb49e2248c441e78da15');
  }

  requestToken(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/reset-password`, data);
  }

  updatePassword(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(`${this.serverAddr}/update-password`, data);
  }
}

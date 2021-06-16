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
    return {
      'Authorization': this.authService.getToken()
    }
  }

  login(data: any): Observable<iHttpResponse> {
      return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/sign-in`, data);
  }

  register(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(`${this.serverAddr}/sign-up`, data);
  }

  profile(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/users/profile`, { 
      headers: this.headers() 
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private serverAddr: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  login(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(
      `${this.serverAddr}/sign-in`,
      data
    );
  }

  register(data: any): Observable<iHttpResponse> {
    return this.httpClient.post<iHttpResponse>(
      `${this.serverAddr}/sign-up`,
      data
    );
  }

  prices(): Observable<any> {
    return this.httpClient.get<any>(
      'https://api.pancakeswap.info/api/v2/tokens/0x6509c95b1ac498390e40eb49e2248c441e78da15'
    );
  }

  validateHash(hash: string): Observable<any> {
    const apiKey = '7BDRK3QQ5BQQRY2IXP4EMIESQVGJGGB6DD';
    return this.httpClient.get(
      `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${apiKey}`
    );
  }

  requestToken(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(
      `${this.serverAddr}/reset-password`,
      data
    );
  }

  updatePassword(data: any): Observable<iHttpResponse> {
    return this.httpClient.put<iHttpResponse>(
      `${this.serverAddr}/update-password`,
      data
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class HttpServiceAuth {
  private serverAddr: string = 'http://localhost:3000/api/users';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  headers(): any {
    return { Authorization: this.authService.getToken() };
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

  isAdmin(): Observable<iHttpResponse> {
    return this.httpClient.get<iHttpResponse>(`${this.serverAddr}/is-admin`, {
      headers: this.headers(),
    });
  }
}

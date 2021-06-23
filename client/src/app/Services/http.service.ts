import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { Observable } from 'rxjs';
import { serverAddr, apiKey } from './settings';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private serverAddr: string = `${serverAddr}/api`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

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

  startChat(data: any): Observable<iHttpResponse> {
    let args = {
      url: `${this.serverAddr}/start-chat`,
      data,
      headers: { headers: this.tokenService.headers() },
    };

    return this.httpClient.post<iHttpResponse>(
      args.url,
      args.data,
      args.headers
    );
  }

  findChat(chatId: string): Observable<iHttpResponse> {
    let args = {
      url: `${this.serverAddr}/find-chat/${chatId}`,
      headers: { headers: this.tokenService.headers() },
    };

    return this.httpClient.get<iHttpResponse>(args.url, args.headers);
  }
}

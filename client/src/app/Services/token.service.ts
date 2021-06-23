import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    return localStorage.setItem('token', token);
  }

  clearToken(): void {
    return localStorage.removeItem('token');
  }

  headers(): any {
    return this.getToken() !== null ? { Authorization: this.getToken() } : {};
  }

  loggedIn(): boolean {
    const isExpired = helper.isTokenExpired(this.getToken() as string);

    if (isExpired) {
      this.clearToken();
    }

    return !isExpired;
  }
}

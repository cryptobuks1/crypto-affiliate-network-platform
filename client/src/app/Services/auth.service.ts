import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

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

    return !isExpired;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceAuth } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  private __ngContext__: any;

  constructor(
    public httpServiceAuth: HttpServiceAuth,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.__ngContext__[0].querySelector('.page-title').textContent =
      'Administration';

    this.httpServiceAuth.isAdmin().subscribe((response: iHttpResponse) => {
      if (!response.data) {
        this.router.navigate(['/']);
      }
    });
  }
}

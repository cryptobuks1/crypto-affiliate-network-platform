import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.scss']
})
export class VerifyIdentityComponent implements OnInit {
  public user: any | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.profile();
  }

  profile(): void {
    this.authService.profile().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.user = response.data;
      }
    });
  }
}

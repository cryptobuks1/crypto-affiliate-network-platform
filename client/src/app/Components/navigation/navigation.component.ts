import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public navState: boolean = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}

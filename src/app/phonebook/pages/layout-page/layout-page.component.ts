import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  public username: string | null = '';
  constructor(public authService: AuthService) {
    this.username = localStorage.getItem('username');
  }
  logout(){
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/login-user.model';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit{
  loggedUser: LoginUser;
  userLevel: string;
  userName: string;

  constructor(private auth: AuthService) {};

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.loggedUser = user;
      this.userLevel = user.level;
      this.userName = user.email.split('@')[0];
    });
  }


  onLogout () {
    this.auth.logout();
  }
}

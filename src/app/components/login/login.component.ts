import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    this.authService.googleLogin();
  }
}

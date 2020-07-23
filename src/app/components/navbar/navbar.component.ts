import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false
  displayName: string = ''
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true
        this.displayName = auth.displayName
      } else [
        this.isLoggedIn = false
      ]
    })
  }

  signOut() {
    this.authService.signOut();
  }

}

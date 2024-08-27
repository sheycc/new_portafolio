import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private auth: AuthService) {  }

  isAdmin() {
    return this.auth.user.uid;
  }

  logout() {
    this.auth.logout();
  }
}

import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private auth: AuthService,
              private router: Router
  ) {
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/admin/signIn'])
    })
  }
}

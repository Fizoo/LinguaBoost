import { Component } from '@angular/core';
import { AuthService } from 'src/app/admin/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  value: any;

  constructor(private authService: AuthService) {

  }


  sign() {

  }
}

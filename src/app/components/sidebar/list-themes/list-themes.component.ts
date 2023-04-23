import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-list-themes',
  templateUrl: './list-themes.component.html',
  styleUrls: ['./list-themes.component.scss']
})
export class ListThemesComponent {
  @Input() item:any
  isActive=false

}

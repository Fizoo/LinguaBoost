import {Component, Input} from '@angular/core';
import {Theme, Words} from "../../../models/data";

@Component({
  selector: 'app-list-themes',
  templateUrl: './list-themes.component.html',
  styleUrls: ['./list-themes.component.scss']
})
export class ListThemesComponent {
  @Input() item:Theme
  isActive=false

}

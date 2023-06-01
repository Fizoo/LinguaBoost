import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Theme} from "../../../models/data";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MenuComponent {
 @Input() el:Theme
}

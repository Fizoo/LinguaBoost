import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Theme} from "../../../../models/data";

@Component({
  selector: 'app-list-themes',
  templateUrl: './list-themes.component.html',
  styleUrls: ['./list-themes.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListThemesComponent {
  @Input() item:Theme
  @Output() navigate = new EventEmitter<string>()

  change(id:string) {
    this.navigate.emit(id)
  }
}

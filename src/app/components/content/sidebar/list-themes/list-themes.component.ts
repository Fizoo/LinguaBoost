import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Theme} from "../../../../models/data";
import {FirestoreService} from "../../../../services/firestore.service";

@Component({
  selector: 'app-list-themes',
  templateUrl: './list-themes.component.html',
  styleUrls: ['./list-themes.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListThemesComponent {
  @Input() item:Theme
  constructor(private firestore:FirestoreService) {
  }

  add(item: Theme) {
     this.firestore.addThemeAddCol(item).subscribe()
  }
}

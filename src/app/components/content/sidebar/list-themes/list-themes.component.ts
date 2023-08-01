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
    console.log(item)
    let x= {
      id: '1',
      name: '11',
      timeOfDay: [{
        date: new Date().toLocaleDateString(),
        counter: 0
      }],
      countDays: 0,
      tasksCompleted: 0,
      score: 0
    }
      // this.firestore.addProgressItem(x).subscribe()
  }
}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {DataActions} from "../../store/data/actions";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  constructor(private store:Store) {
    this.store.dispatch(DataActions.initial())
  }

}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import {Theme} from "../../models/data";
import {DataSelectors} from "../../store/data/selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  $menu: Observable<Theme[]>

  constructor(private store: Store) {
    this.$menu=this.store.select(DataSelectors.getAllThemes).pipe()
  }


}

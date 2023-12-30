import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import {Theme} from "../../models/data";
import {DataSelectorsWords} from "../../store/data/selectors";
import {MatDialog} from "@angular/material/dialog";
import {SearchDialogComponent} from "./search-dialog/search-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  $menu: Observable<Theme[]>
  word: string=''

  constructor(private store: Store,
              private dialog:MatDialog
              ) {
    this.$menu=this.store.select(DataSelectorsWords.getAllThemes).pipe()
  }
  openDialog(): void {
    if(this.word) {
      const dialogRef = this.dialog.open(SearchDialogComponent, {
        data: {word: this.word},
        maxWidth: '95vw',

      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
        this.word = '';
      });
    }
  }



}

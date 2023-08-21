import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Theme} from "../../../models/data";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {DataSelectorsWords} from "../../../store/data/selectors";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit{
  inputValue: string = ''
  themeList$: Observable <Theme[]  >
  themeListLength=0

  constructor(private router: Router,
              private store:Store,
              ) {
  }

  ngOnInit(): void {
   this.themeList$= this.store.select(DataSelectorsWords.getWordsData).pipe(
     tap(el=>this.themeListLength=el.length)
   )
  }

  navigate(id: string) {
    this.router.navigate(['/theme', id])
  }

  trackByFn(index: number, item: Theme) {
    return item.id
  }

}

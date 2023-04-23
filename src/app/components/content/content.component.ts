import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {Data} from "../../models/data";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']

})
export class ContentComponent implements OnInit {
  list$:Observable<Data[]>
  searchText:string=''

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.list$=this.dataService.data$
  }

  trackByFn(index: number, item: Data) {
    return item.id
  }

  onSearch(searchText: string) {
    this.searchText=searchText

  }
}

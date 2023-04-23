import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent {
  @Output() searchChange  = new EventEmitter<string>();

  search: string = '';

  onSearch() {
    this.searchChange.emit(this.search);
  }

}

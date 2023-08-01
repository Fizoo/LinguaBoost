import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CollectTopic} from "../../../../../models/data";

@Component({
  selector: 'app-d-nav',
  templateUrl: './d-nav.component.html',
  styleUrls: ['./d-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DNavComponent {
  @Input() list: CollectTopic[] | null = []
  @Output() searchWord = new EventEmitter<string>()
  @Output() sortList = new EventEmitter<string>()

  search: string = ''

  onSort(value: string) {
    this.sortList.emit(value)
  }

  onSearch() {
    if (this.search) {
      this.searchWord.emit(this.search)
    }
  }
}

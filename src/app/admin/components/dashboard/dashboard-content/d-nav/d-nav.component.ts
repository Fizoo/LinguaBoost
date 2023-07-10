import {Component, Input} from '@angular/core';
import {CollectTopic} from "../../../../../models/data";

@Component({
  selector: 'app-d-nav',
  templateUrl: './d-nav.component.html',
  styleUrls: ['./d-nav.component.scss']
})
export class DNavComponent {
  @Input() list:CollectTopic[]|null=[]

  onSort(value: any) {

  }
}

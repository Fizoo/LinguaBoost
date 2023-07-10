import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CollectTopic} from "../../../../models/data";

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardSidebarComponent {
  @Input() listArr:CollectTopic[]|null
  inputValue: string=''

  trackByFn(index: number, item: CollectTopic) {
    return item.id
  }


}

import {Component, Input} from '@angular/core';
import {TopicPhrases} from "../../../models/data";

@Component({
  selector: 'app-sidebar-phrase',
  templateUrl: './sidebar-phrase.component.html',
  styleUrls: ['./sidebar-phrase.component.scss']
})
export class SidebarPhraseComponent {
  @Input() listPhrase: TopicPhrases[]|null
  inputValue=''

  trackByFn(index: number, item: TopicPhrases) {
      return item.id
    }

}

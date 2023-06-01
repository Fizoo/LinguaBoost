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

  // TODO: create pipe dor search


  trackByFn(index: number, item: TopicPhrases) {
      return item.id
    }

}

import {Component, Input} from '@angular/core';
import {TopicPhrases} from "../../../../models/data";

@Component({
  selector: 'app-phrase-list-sidebar',
  templateUrl: './phrase-list-sidebar.component.html',
  styleUrls: ['./phrase-list-sidebar.component.scss'],

})
export class PhraseListSidebarComponent {
   @Input() list:TopicPhrases
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Phrase} from "../../../../models/data";

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.scss'],

})
export class VerbListComponent {
  @Input() list:Phrase
  @Input() searchWord:string
  @Output() speakFn=new EventEmitter<string>()
  isVisible1=false
  isVisible2=false

  speak(value: string) {

    this.speakFn.emit(value)
  }

}

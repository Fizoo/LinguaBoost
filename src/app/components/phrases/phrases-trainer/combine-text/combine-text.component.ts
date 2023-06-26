import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SpeakerService} from "../../../../services/speaker.service";

@Component({
  selector: 'app-combine-text',
  templateUrl: './combine-text.component.html',
  styleUrls: ['./combine-text.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CombineTextComponent {
  @Input() text:string
  isVisible=false

  constructor(private speaker:SpeakerService) {
  }

  actions(text: string) {
    this.isVisible=true
    if (this.isVisible){
      this.speaker.speak(text)
    }
  }
}

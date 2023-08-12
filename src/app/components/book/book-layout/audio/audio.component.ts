import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AudioComponent {
  @Input() selectedAudioUrl: string=''
}

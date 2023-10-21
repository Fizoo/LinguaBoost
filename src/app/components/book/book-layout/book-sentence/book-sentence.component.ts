import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Sentence} from "../../../../models/book";

@Component({
  selector: 'app-book-sentence',
  templateUrl: './book-sentence.component.html',
  styleUrls: ['./book-sentence.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BookSentenceComponent {
  @Input() text: Sentence
  @Input() index: number
  @Output() speaker = new EventEmitter<string>()
  @Output() speakerStop = new EventEmitter()

  isVisibility = true

  speak() {
    this.speaker.emit(this.text.sentence)
  }

  stop() {
    this.speakerStop.emit()
  }
}

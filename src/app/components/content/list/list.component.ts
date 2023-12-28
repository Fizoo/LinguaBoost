import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Speaker2Service} from 'src/app/services/speaker3.service';
import {Words} from "../../../models/data";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit{
  @Input() item:Words

  isExample = false
  isTranslateWord = false
  isUkrainianTranslationOfSentence = false
  isTranscript = true

  constructor(private speakerService: Speaker2Service) {
  }

  setExample() {
    this.isExample = !this.isExample
  }

  speak(text: string) {
    this.speakerService.speak(text)
  }

  ngOnInit(): void {

  }
}

import {Component, Input} from '@angular/core';
import { SpeakerService } from 'src/app/services/speaker.service';
import {Data} from "../../models/data";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() item:Data

  isExample=false

  constructor(private speakerService:SpeakerService){

  }

  //dataList:Data=[]


  setExample() {
    this.isExample = !this.isExample
  }
  speak(text:string){
    this.speakerService.speak(text)
  }
}

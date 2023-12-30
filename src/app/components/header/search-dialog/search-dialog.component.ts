import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Words} from "../../../models/data";
import {DataSelectorsWords} from "../../../store/data/selectors";
import {SpeakerService} from "../../../services/speaker.service";

interface MyData {
  word:string
}

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit{

  word$=new Observable<Words | ''>()

  constructor(
    private store:Store,
    private speaker:SpeakerService,
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MyData,
  ) {}

  ngOnInit(): void {
    this.word$=this.store.select(DataSelectorsWords.getWord(this.data.word))
  }
  speak(value:string){
    this.speaker.speak(value)
  }

  onNoClick() {
    this.dialogRef.close();
  }


  add() {
    const storedJsonString = localStorage.getItem('list')
    if(storedJsonString){
      const storedDataArray = JSON.parse(storedJsonString);
      storedDataArray.push(this.data.word)
      localStorage.setItem('list', JSON.stringify(storedDataArray));
    }
    else {
      // Якщо даних ще немає, просто зберігаємо поточні дані
      localStorage.setItem('list', JSON.stringify(this.data.word));
    }
    this.dialogRef.close();
  }
}

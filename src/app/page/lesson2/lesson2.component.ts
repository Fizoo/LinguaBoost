import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-lesson2',
  templateUrl: './lesson2.component.html',
  styleUrls: ['./lesson2.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Lesson2Component implements OnInit{
  counterScore:number=0
  countMin:number=0

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      first(),
    ).subscribe(({counterScore,countMin})=>{
      if(counterScore || countMin){
        this.counterScore = +counterScore
        this.countMin= +countMin
      }
    })
  }


}

import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  @HostListener('document:keydown.enter')
  onEnter() {
    this.router.navigate(['theme/:id/:lessons/result/goal'])
  }
  constructor(private route:ActivatedRoute,
              private router:Router
              ) {
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

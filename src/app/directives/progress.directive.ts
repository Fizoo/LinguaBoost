import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {DataSelectors} from "../store/data/selectors";

@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective implements OnInit{
  @Input('appProgress') id: string

  constructor(private el: ElementRef,
              private r2:Renderer2,
              private store: Store) {
  }

  ngOnInit() {
    this.store.select(DataSelectors.getProgressTheme(this.id)).subscribe(data=>{
      if (data){
        this.setButtonColor(Math.ceil( data));
      }
    })
  }

  private setButtonColor(progress: number): void {
    const button = this.el.nativeElement as HTMLButtonElement;
    const gradient = this.calculateGradient(progress);
    button.style.backgroundImage = gradient;
    //button.style.opacity='0.5'
  }

  private calculateGradient(progress: number): string {
    const percentage = Math.min(Math.max(progress, 0), 100);
    let startColor=''
    switch (true) {
      case (percentage <= 10):
        startColor = '#7b2626';
        break;
      case (percentage <= 33):
        startColor = '#c07964';
        break;
      case (percentage <= 66):
        startColor = '#faeac2';
        break;
      case (percentage <= 90):
        startColor = '#b8eeb8';
        break;
      default:
        startColor = '#4cfbe6';
        break;
    }

    const endColor = '#f6f6f6';
    return `linear-gradient(to right, ${startColor} ${percentage}%, ${endColor} ${percentage}%)`;
  }

}

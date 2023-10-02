import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Store} from "@ngrx/store";
import {DataSelectorsWords} from "../store/data/selectors";

@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective implements OnInit {
  @Input('appProgress') id: string

  constructor(private el: ElementRef,
              private r2: Renderer2,
              private store: Store) {
  }

  ngOnInit() {
    this.store.select(DataSelectorsWords.getProgressTheme(this.id)).subscribe(data => {
      if (data) {
        this.setButtonColor(Math.ceil(data));
      }
    })
  }

  private setButtonColor(progress: number): void {
    const button = this.el.nativeElement as HTMLButtonElement;
    button.style.backgroundImage = ProgressDirective.calculateGradient(progress);
    //button.style.opacity='0.5'
  }

  private static calculateGradient(progress: number): string {
    const percentage = Math.min(Math.max(progress, 0), 100);
    //const percentage =91
   // console.log('progress==',progress,',percentage=',percentage)
    let startColor = ''

    switch (true) {
      case (percentage <= 10):
        startColor = '#fb4b4b';
        break;
      case (percentage <= 33):
        startColor = '#ffa879';
        break;
      case (percentage <= 66):
        startColor = '#ffc163';
        break;
      case (percentage <= 75):
        startColor = '#feff5c';
        break;
      case (percentage <= 90):
        startColor = '#c0ff33';
        break;
      case (percentage <= 99):
        startColor = '#2cba00';
        break;
        case (percentage === 100):
        startColor = '#4cfbe6';
        break;
      default:
        startColor = '#ecebeb';
        break;
    }
/*    switch (true) {
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
      case (percentage <= 95):
        startColor = '#5bca5b';
        break;
        case (percentage <= 100):
          startColor = '#4cfbe6';
        break;
      default:
        startColor = '#ffffff';
        break;
    }*/

    /*    switch (true) {
      case (percentage <= 10):
        startColor = '#cefad0';
        break;
      case (percentage <= 25):
        startColor = '#abf7b1';
        break;
      case (percentage <= 50):
        startColor = '#83f28f';
        break;
      case (percentage <= 75):
        startColor = '#5ced73';
        break;
        case (percentage <= 90):
        startColor = '#1fd655';
        break;
      case (percentage <= 95):
        startColor = '#00c04b';
        break;
      case (percentage <= 100):
        startColor = '#008631';
        break;
      default:
        startColor = '#ffffff';
        break;
    }*/

    const endColor = '#f6f6f6';
    return `linear-gradient(to right, ${startColor} ${percentage}%, ${endColor} ${percentage}%)`;
  }

}

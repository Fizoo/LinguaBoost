import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appColorProgress]'
})
export class ColorProgressDirective implements OnInit{
  @Input('appColorProgress') someValue:number=1
  @Input() allValue:number=1

  constructor(private r2:Renderer2,
              private el:ElementRef) {

  }
  ngOnInit() {
    this.setColor();
  }

  private setColor() {
    const combinedValue = this.someValue / this.allValue
    let color: string
    switch (true) {
      case (combinedValue < 0.05):
        color = 'darkred';
        break;
      case (combinedValue >= 0.05 && combinedValue < 0.15):
        color = 'red';
        break;
      case (combinedValue >= 0.15 && combinedValue < 0.35):
        color = 'orange';
        break;
      case (combinedValue >= 0.35 && combinedValue < 0.50):
        color = 'yellow';
        break;
      case (combinedValue >= 0.50 && combinedValue < 0.66):
        color = 'lightyellow';
        break;
      case (combinedValue >= 0.66 && combinedValue < 0.80):
        color = 'lightgreen';
        break;
      case (combinedValue >= 0.80 && combinedValue < 0.90):
        color = 'green';
        break;
      case (combinedValue >= 0.90 && combinedValue < 0.95):
        color = 'darkgreen';
        break;
      case (combinedValue >= 0.95 && combinedValue <= 1):
        color = 'forestgreen';
        break;
      default:
        color = 'gray';
    }

    this.r2.setStyle(this.el.nativeElement, 'color', color);
  }

}

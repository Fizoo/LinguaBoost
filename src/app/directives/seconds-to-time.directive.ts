import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSecondsToTime]'
})
export class SecondsToTimeDirective {
  @Input() set appSecondsToTime(seconds: number) {
    this.el.nativeElement.textContent = this.formatTime(seconds);
  }
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.el.nativeElement.tagName === 'INPUT') {
      // Якщо це вхідний елемент, встановимо значення через атрибут
      this.renderer.setAttribute(this.el.nativeElement, 'value', this.el.nativeElement.textContent);
    }
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = this.padZero(minutes);
    const formattedSeconds = this.padZero(remainingSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}

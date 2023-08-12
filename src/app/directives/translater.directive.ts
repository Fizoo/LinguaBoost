import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {Store} from "@ngrx/store";
import {DataSelectorsWords} from "../store/data/selectors";
import {Words} from "../models/data";
import {map, tap} from "rxjs";

@Directive({
  selector: '[appTranslater]'
})
export class TranslaterDirective  {
  @Input('appTranslater') value: string

  private newSpan: any;
  private timeout: any;

  list: Words[]
  result: string = ''

  constructor(private el: ElementRef,
              private r2: Renderer2,
              private store: Store) {
  }

  @HostListener('mouseenter') onClick() {
    this.timeout = setTimeout(() => {
      this.store.select(DataSelectorsWords.getWordsData).pipe(
        map(el => el.map(o => o.data)),
        map(el => [...el.reduce((acc, value) => acc.concat(value), [])]),
        tap(el => el.forEach(a => a.englishWord === this.value.replace(/\W/, '') ? this.result = a.ukrainianTranslation : ''))
      ).subscribe(() => {

        if (this.result) {
          this.popup()
        }
      })
    }, 1000)
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.newSpan) {
      // Видаляємо новий span при відведенні миші
      this.r2.removeChild(this.el.nativeElement.parentNode, this.newSpan);
      this.newSpan = null; // Знімаємо посилання
    }
    clearTimeout(this.timeout);
  }

  popup() {
    this.newSpan = this.r2.createElement('span');
    this.r2.setProperty(this.newSpan, 'innerText', this.result);
    this.r2.addClass(this.newSpan, 'pop-up-span'); // Додаємо клас стилів
    this.r2.appendChild(this.el.nativeElement.parentNode, this.newSpan);
  }

}

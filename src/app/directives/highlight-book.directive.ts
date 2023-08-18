import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appHighlightBook]'
})
export class HighlightBookDirective implements OnChanges{
@Input('appHighlightBook') appHighlight = ''
@Input() searchTerm = ''

  constructor(private el:ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
  if(this.appHighlight || this.searchTerm){
    this.highlightText();
  }
  }

  private highlightText() {
    const normalizedSearch=this.searchTerm.toLowerCase().trim()
    const text=this.appHighlight
    const parts=text.split(new RegExp(`(${normalizedSearch})`,'gi'))

    this.el.nativeElement.innerHTML=parts.map(part=>
    part.toLowerCase()===normalizedSearch?`<mark>${part}</mark>`:part).join('')
  }
}

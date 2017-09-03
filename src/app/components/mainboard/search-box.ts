import { Component, Input, Output, EventEmitter, Renderer, ElementRef } from '@angular/core';

import { Utils } from '../../utils';

let template = `
<input class="search-box input is-primary is-large is-hidden-touch" type="text" placeholder="Search..." [(ngModel)]="keyword" (ngModelChange)="onChange($event)">
`;


@Component({
  selector: 'search-box',
  template
})
export class SearchBox {
  @Input() keyword: string;
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private utils: Utils,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {}

  doFocus() {
    this.elementRef.nativeElement.focus();
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []
    );
  }

  onChange(newKeyword: string) {
    this.keyword = newKeyword;
    this.keywordChange.emit(newKeyword);
  }
}

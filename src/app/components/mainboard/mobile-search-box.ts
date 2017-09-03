import { Component, Input, Output, EventEmitter, Renderer, ElementRef } from '@angular/core';

import { Utils } from '../../utils';

let template = `
<input class="search-box mobile label is-hidden-desktop" type="text" placeholder="Search..." [(ngModel)]="keyword" (ngModelChange)="onChange($event)" >
<button class="button is-danger" *ngIf="keyword" (click)="doCancel()">Cancel</button>
`;


@Component({
  selector: 'mobile-search-box',
  template,
  styleUrls: ['./mobile-search-box.scss']
})
export class MobileSearchBox {
  @Input() keyword: string;
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private utils: Utils,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {}

  onChange(newKeyword: string) {
    this.keyword = newKeyword;
    this.keywordChange.emit(newKeyword);
  }

  doCancel() {
    this.keyword = "";
    this.keywordChange.emit("");
  }
}

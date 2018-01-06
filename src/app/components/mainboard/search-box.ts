import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer, ViewChild } from '@angular/core';

import { Utils } from '../../utils';

let template = `
<input #desktopSearchbar class="search-box input is-primary is-large is-hidden-touch" type="text" placeholder="Search..." [(ngModel)]="keyword" (ngModelChange)="onChange($event)">
`;


@Component({
  selector: 'search-box',
  template
})
export class SearchBox implements OnInit {
  @Input() keyword: string;
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();
  @ViewChild("desktopSearchbar") desktopSearchbar: ElementRef;

  constructor(
    private utils: Utils,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.doFocus()
  }

  public doFocus() {
    if(this.desktopSearchbar){
      this.renderer.invokeElementMethod(
        this.desktopSearchbar.nativeElement, 'focus', []
      );
    }
  }

  onChange(newKeyword: string) {
    this.keyword = newKeyword;
    this.keywordChange.emit(newKeyword);
  }
}

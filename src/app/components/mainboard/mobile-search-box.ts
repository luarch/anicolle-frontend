import { Component, Input, Output, EventEmitter, Renderer, ElementRef, ViewChild, OnInit } from '@angular/core';

import { Utils } from '../../utils';

let template = `
<input #mobileSearchbar class="search-box mobile label is-hidden-desktop" type="text" placeholder="Search..." [(ngModel)]="keyword" (focus)="onFocus()" (blur)="onBlur()" (ngModelChange)="onChange($event)" >
<button class="button is-danger is-hidden-desktop" *ngIf="focused || keyword" (click)="doCancel()">Cancel</button>
`;


@Component({
  selector: 'mobile-search-box',
  template,
  styleUrls: ['./mobile-search-box.scss']
})
export class MobileSearchBox implements OnInit {
  @Input() keyword: string;
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();
  @ViewChild("mobileSearchbar") mobileSearchbar: ElementRef;
  private focused: boolean = false;

  constructor(
    private utils: Utils,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
  }

  public doFocus() {
    if(this.mobileSearchbar) {
      this.renderer.invokeElementMethod(
        this.mobileSearchbar.nativeElement, 'focus', []
      );
    }
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
  }

  onChange(newKeyword: string) {
    this.keyword = newKeyword;
    this.keywordChange.emit(newKeyword);
  }

  doCancel() {
    this.keyword = "";
    this.keywordChange.emit("");
  }
}

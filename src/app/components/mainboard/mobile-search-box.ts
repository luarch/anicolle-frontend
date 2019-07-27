import { Component, Input, Output, EventEmitter, Renderer, ElementRef, ViewChild, OnInit, AfterContentInit } from '@angular/core';

import { Utils } from '../../utils';

let template = `
<input #mobileSearchbar class="search-box mobile label is-hidden-desktop" type="text" placeholder="Search..." [(ngModel)]="keyword" (focus)="onFocus()" (blur)="onBlur()" (ngModelChange)="onChange($event)" (keyup)="onKeyup($event)">
<button class="button is-danger is-hidden-desktop" *ngIf="focused || keyword" (click)="doCancel()">Cancel</button>
<div class="command-list" *ngIf="focused && !keyword">
  <ul>
    <li *ngFor="let command of commandList" (click)="insertKeyword(command.kw)">
      <a href="javascript: void()" class="is-no-style">{{command.title}}</a>
    </li>
  </ul>
</div>
`;


@Component({
  selector: 'mobile-search-box',
  template,
  styleUrls: ['./mobile-search-box.scss']
})
export class MobileSearchBox implements OnInit, AfterContentInit {
  @Input() keyword: string;
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();
  @ViewChild('mobileSearchbar') mobileSearchbar: ElementRef;
  focused = false;
  commandList = [
    {title: 'All On-Air', kw: '!oa'},
    {title: 'On-Air Monday', kw: 'w1'},
    {title: 'On-Air Tuesday', kw: 'w2'},
    {title: 'On-Air Wednesday', kw: 'w3'},
    {title: 'On-Air Thursday', kw: 'w4'},
    {title: 'On-Air Friday', kw: 'w5'},
    {title: 'On-Air Saturday', kw: 'w6'},
    {title: 'On-Air Sunday', kw: 'w7'},
  ];

  constructor(
    private utils: Utils,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    setTimeout(() => { // Tick to avoid state change error
      // Auto insert '!oa' quick command
      if (window.location.hash.match(/^#!oa$/)) {
        this.insertKeyword('!oa');
      }
    }, 0);
  }

  public doFocus() {
    if (this.mobileSearchbar) {
      this.renderer.invokeElementMethod(
        this.mobileSearchbar.nativeElement, 'focus', []
      );
    }
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
  }

  onKeyup(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.focused = false;
    } else {
      this.focused = true;
    }
  }

  onChange(newKeyword: string) {
    this.keyword = newKeyword;
    this.keywordChange.emit(newKeyword);
  }

  insertKeyword(keyword: string) {
    this.onChange(keyword);
    this.focused = false;
  }

  doCancel() {
    this.keyword = '';
    this.keywordChange.emit('');
    this.focused = false;
  }
}

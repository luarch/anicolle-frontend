import { Component, OnInit, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';

import { Utils } from '../../utils';
import { CONSTANTS } from '../../constants';
import { BangumiService, Bangumi, Seeker } from '../../services/bangumi-service';


@Pipe({
  name: "bangumiSearch"
})
export class BangumiSearchPipe implements PipeTransform {
  transform(value: Bangumi[], keyword: string): Bangumi[] {
    if(keyword)
      keyword = String(keyword).trim();
    if(!keyword) {
      for(let b of value) {
        b.hide = false;
      }
      return value;
    }
    for(let b of value) {
      b.hide = true;
      if(b.name.toLowerCase().includes(keyword.toLowerCase())) {
        b.hide = false;
      }
    }
    return value;
  }
}

@Component({
  selector: 'mainboard',
  templateUrl: './mainboard.html',
  styleUrls: ['./mainboard.scss']
})
export class Mainboard implements OnInit {
  seekers: Seeker[];
  bangumis: Bangumi[];
  keyword: string;
  @Output() error: EventEmitter<Error> = new EventEmitter();

  constructor(
    private utils: Utils,
    private bangumiSvc: BangumiService
  ) {}

  ngOnInit() {
    this.doLoad();
  }

  handleError(e: Error) {
    this.error.emit(e);
  }

  doLoad() {
    this.bangumiSvc.getAllBangumis()
    .then((data) => {
      this.bangumis = data;
    })
    .catch(this.handleError);

    this.bangumiSvc.getAllSeekers()
    .then((data) => {
      this.seekers = data;
    }).catch(this.handleError);
  }

  bangumiTrackBy(index: number, item: Bangumi) {
    return item.id;
  }

}

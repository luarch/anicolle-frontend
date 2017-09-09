import { Component, OnInit, Output, EventEmitter, Pipe, PipeTransform, ViewChild, NgZone } from '@angular/core';

import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Utils } from '../../utils';
import { CONSTANTS } from '../../constants';
import { BangumiService, Bangumi, Seeker } from '../../services/bangumi-service';
import { SearchBox } from './search-box';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import pinyin from 'pinyin';

@Pipe({
  name: "bangumiSearch",
})
export class BangumiSearchPipe implements PipeTransform {
  transform(value: Bangumi[], keyword: string): Bangumi[] {
    if(!value) return value;
    if(!keyword) {
      for(let b of value) {
        b.hide = false;
      }
      return value;
    } else {
      keyword = keyword.trim();
    }
    let on_air_day_match = keyword.match(/^w(\d)$/i);
    for(let b of value) {
      b.hide = true;
      let bname_pinyin = pinyin(b.name, {
        style: pinyin.STYLE_FIRST_LETTER
      });
      bname_pinyin = bname_pinyin.join('')

      if(b.name.toLowerCase().includes(keyword.toLowerCase())) {
        // General Search
        b.hide = false;
      } else if(bname_pinyin.includes(keyword.toLowerCase())) {
        // Pinyin Search
        b.hide = false;
      } else if(on_air_day_match && on_air_day_match[1] === b.on_air_day.toString()) {
        // On_air_day filter
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
  bangumis: Bangumi[];
  keyword: string = "";
  @Output() error: EventEmitter<Error> = new EventEmitter();
  @ViewChild(SearchBox) private searchBox: SearchBox;
  @ViewChild(DetailModalComponent) private detailModal: DetailModalComponent;

  constructor(
    private utils: Utils,
    private bangumiSvc: BangumiService,
    private hotkeySvc: HotkeysService,
    private zone: NgZone
  ) {
    this.hotkeySvc.add(new Hotkey("alt+f", (event: KeyboardEvent): boolean=> {
      this.searchBox.doFocus();
      return false;
    }));
  }

  ngOnInit() {
    this.doLoad();
  }

  handleError(e: Error) {
    this.error.emit(e);
  }

  doLoad() {
    this.bangumiSvc.getAllBangumis()
    .then((data) => {
      this.zone.run(()=>{
        this.bangumis = data;
      });
    })
    .catch(this.handleError);

  }

  bangumiTrackBy(index: number, item: Bangumi) {
    return item.id;
  }

  focusOnSearchbar() {
    console.log("Try focus");
  }

  onOpenEdit(b: Bangumi) {
    this.detailModal.open(b);
  }

  doAddButtonClick() {
    this.detailModal.open(null);
  }
}

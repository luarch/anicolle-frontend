import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Utils } from '../../utils';
import { CONSTANTS } from '../../constants';
import { BangumiService, Bangumi, Seeker, BangumiCheckUp } from '../../services/bangumi-service';

@Component({
  selector: 'box',
  templateUrl: './box.html',
  styleUrls: ['./box.scss']
})
export class Box {
  @Input() bangumi = <Bangumi>null;
  @Input() allSeekers: Seeker[];
  @Output() bangumiChange: EventEmitter<Bangumi> = new EventEmitter();
  @Output() checkedUp: EventEmitter<Promise<BangumiCheckUp[]>> = new EventEmitter();
  @Output() openEdit: EventEmitter<Bangumi> = new EventEmitter();
  loadingCurEpi: boolean = false;

  constructor(
    private utils: Utils,
    private bangumiSvc: BangumiService
  ) {}

  doCheckUp() {
    let p = this.bangumiSvc.getBangumiCheckUp(this.bangumi);
    this.checkedUp.emit(p);
  }

  doPlus() {
    this.loadingCurEpi = true;
    this.bangumiSvc.plusBangumi(this.bangumi)
    .then((cur_epi: number)=>{
      this.bangumi.cur_epi = cur_epi;
      this.loadingCurEpi = false;
      this.bangumiChange.emit(this.bangumi);
    });
  }

  doDecrease() {
    this.loadingCurEpi = true;
    this.bangumiSvc.decreaseBangumi(this.bangumi)
    .then((cur_epi: number)=>{
      this.bangumi.cur_epi = cur_epi;
      this.loadingCurEpi = false;
      this.bangumiChange.emit(this.bangumi);
    });
  }

  enterEdit() {
    this.openEdit.emit(this.bangumi);
  }

}

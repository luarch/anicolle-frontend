import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { BangumiService, Bangumi, Seeker } from '../../services/bangumi-service';
import { Utils } from '../../utils';
import { CONSTANTS } from "../../constants";

@Component({
  selector: 'detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit, OnDestroy {
  @Input() bangumi: Bangumi;
  @Output() bangumiUpdated: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  seekers: string[];
  b: Bangumi = new Bangumi();
  constants = CONSTANTS;

  constructor(
    private utils: Utils,
    private bangumiSvc: BangumiService
  ) { }

  handleError() {
    // TODO Handle error
  }

  ngOnInit() {
    document.body.style.overflow = "hidden";
    this.bangumiSvc.getAllSeekers()
    .then((data) => {
      this.seekers = data;
      if(this.bangumi) {
        this.b = JSON.parse(JSON.stringify(this.bangumi));
      } else {
        this.b = new Bangumi();
      }
      // Assign seekers data
      for(let seeker_name of this.seekers) {
        if(this.b.seekers_obj.find((e)=>{return e.seeker === seeker_name})) {
          continue;
        } else {
          this.b.seekers_obj.push(
            {seeker: seeker_name, chk_key: ""}
          );
        }
      }
    }).catch(this.handleError);
  }

  ngOnDestroy() {
    document.body.style.overflow = "auto";
  }

  save() {
    this.bangumiSvc.updateBangumi(this.b)
    .then(()=>{
      this.bangumiUpdated.emit();
      this.close.emit();
    }).catch(this.handleError);
  }

  delete() {
    this.bangumiSvc.deleteBangumi(this.b)
    .then(()=>{
      this.bangumiUpdated.emit();
      this.close.emit();
    }).catch(this.handleError);
  }

  create() {
    this.bangumiSvc.createBangumi(this.b)
    .then(()=>{
      this.bangumiUpdated.emit();
      this.close.emit();
    }).catch(this.handleError);
  }
}

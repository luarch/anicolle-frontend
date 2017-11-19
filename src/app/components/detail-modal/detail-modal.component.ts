import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BangumiService, Bangumi, Seeker } from '../../services/bangumi-service';
import { Utils } from '../../utils';
import { CONSTANTS } from "../../constants";

@Component({
  selector: 'detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() bangumi: Bangumi;
  @Output() bangumiUpdated: EventEmitter<any> = new EventEmitter();
  seekers: string[];
  b: Bangumi = new Bangumi();
  constants = CONSTANTS;
  opened: boolean = false;
  get isBangumiValid() {
    return this.bangumiSvc.validateBangumi(this.b);
  }

  constructor(
    private utils: Utils,
    private bangumiSvc: BangumiService
  ) {
    this.handleError = this.handleError.bind(this);
  }

  handleError(err: Error) {
    if(err) {
      console.error("unhandled error "+ err.message);
      this.close();
    }
  }

  assignSeekers() {
    // Assign seekers data
    let seekers_obj = new Array<Seeker>();
    for(let seeker_name of this.seekers) {
      let existing_seeker = this.b.seekers_obj.find(e=>e.seeker === seeker_name);
      if(existing_seeker) {
        seekers_obj.push(existing_seeker);
      } else {
        seekers_obj.push(
          {seeker: seeker_name, chk_key: ""}
        );
      }
    }
    this.b.seekers_obj = seekers_obj;
  }

  open(bangumi: Bangumi) {
    this.bangumi = bangumi;
    if(this.bangumi) {
      this.b = JSON.parse(JSON.stringify(this.bangumi));
    } else {
      this.b = new Bangumi();
    }
    this.assignSeekers();

    // Set open
    this.opened = true;
    this.utils.lockBody();
  }

  close() {
    this.opened = false;
    this.utils.unlockBody();
  }

  ngOnInit() {
    this.bangumiSvc.getAllSeekers()
    .then((data) => {
      this.seekers = data.sort(
        (a, b) => a<=b ? -1 : 1
      );
    }).catch(this.handleError);
  }

  save() {
    this.bangumiSvc.updateBangumi(this.b)
    .then(()=>{
      this.bangumiUpdated.emit();
      this.close();
    }).catch(this.handleError);
  }

  delete() {
    if(confirm("Please confirm deleting this bangumi.")) {
      this.bangumiSvc.deleteBangumi(this.b)
      .then(()=>{
        this.bangumiUpdated.emit();
        this.close();
      }).catch(this.handleError);
    }
  }

  create() {
    this.bangumiSvc.createBangumi(this.b)
    .then(()=>{
      this.bangumiUpdated.emit();
      this.close();
    }).catch(this.handleError);
  }
}

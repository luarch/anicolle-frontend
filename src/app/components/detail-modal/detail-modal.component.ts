import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BangumiService, Bangumi, Seeker } from '../../services/bangumi-service';
import { Utils } from '../../utils';

@Component({
  selector: 'detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() bangumi: Bangumi;
  @Output() bangumiUpdated: EventEmitter<any> = new EventEmitter();
  opened :boolean = true;
  b: Bangumi;

  constructor(
    private utils: Utils,
    private bangumiSvc: BangumiService
  ) { }

  ngOnInit() {
  }

  open() {
    if(this.bangumi) {
      this.opened = true;
      this.b = Object.assign(new Object, this.bangumi);
    }
  }

  save() {
    this.bangumiSvc.updateBangumi(this.b)
    .then(()=>{
      this.bangumiUpdated.emit();
    }).catch(()=>{
      // TODO Handle Error
    });
  }

  cancel() {
    this.opened = false;
  }

}

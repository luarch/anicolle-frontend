import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BangumiCheckUp, BangumiCheckUpIntent, BangumiService } from '../../services/bangumi-service';
import { Utils } from '../../utils';

@Component({
  selector: 'update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  opened: boolean = false;
  loadingInd: boolean = false;
  hasError: boolean = false;
  data: BangumiCheckUp[] = new Array();
  intent: BangumiCheckUpIntent = null;

  constructor(
    private utils: Utils,
    private domSanitaizer: DomSanitizer,
    private bangumiSvc: BangumiService
  ) { }

  ngOnInit() {
  }

  open(intent: BangumiCheckUpIntent) {
    this.hasError = false;
    this.loadingInd = true;
    this.data = new Array();
    if(!intent.episode) {
      intent.episode = intent.bangumi.cur_epi+1;
    }
    this.intent = intent;
    intent.p.then((data)=> {
      this.loadingInd = false;
      this.data = data;
    }).catch((e)=>{
      console.log(e);
      this.loadingInd = false;
      this.hasError = true;
    });
    this.opened = true;
    this.utils.lockBody();
  }

  checkNextEpisode() {
    let p = this.bangumiSvc.getBangumiCheckUp(
      this.intent.bangumi,
      this.intent.episode+1);

    var newIntent: BangumiCheckUpIntent = {
      bangumi: this.intent.bangumi,
      episode: this.intent.episode+1,
      p
    };

    this.open(newIntent);
  }

  getSafeUrl(url: string) {
    return this.domSanitaizer.bypassSecurityTrustUrl(url);
  }

  onLinkCopied(item: BangumiCheckUp) {
    item['copied'] = true;
    setTimeout(()=> {
      item['copied'] = false;
    }, 1000);
  }

  close() {
    if(!this.loadingInd) {
      this.opened = false;
      this.utils.unlockBody();
    }
  }
}

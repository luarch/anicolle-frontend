import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BangumiCheckUp } from '../../services/bangumi-service';
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

  constructor(
    private utils: Utils,
    private domSanitaizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  open(p: Promise<BangumiCheckUp[]>) {
    this.hasError = false;
    this.loadingInd = true;
    this.data = new Array();
    p.then((data)=> {
      this.loadingInd = false;
      this.data = data;
    }).catch(()=>{
      this.loadingInd = false;
      this.hasError = true;
    });
    this.opened = true;
    this.utils.lockBody();
  }

  getSafeUrl(url: string) {
    return this.domSanitaizer.bypassSecurityTrustUrl(url);
  }

  close() {
    if(!this.loadingInd) {
      this.opened = false;
      this.utils.unlockBody();
    }
  }
}

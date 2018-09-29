import { Component } from '@angular/core';

import { Utils } from './utils';
import { CONSTANTS } from './constants';
import { BangumiService } from './services/bangumi-service';
import { SettingService } from './services/setting-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Anicolle R2 Frontend Dev';
  pageState: String = CONSTANTS.PAGE_STATE.HOME;

  constructor(
    private utils: Utils,
    private bangumiSvc: BangumiService,
    private settingSvc: SettingService
  ) {
    this.checkConnectivity();

    // Enable :active styles
    document.addEventListener('touchstart', function(){}, true);
  }

  checkConnectivity() {
    this.bangumiSvc.getCheckPoint().then(() => {
      this.pageState = CONSTANTS.PAGE_STATE.HOME;
    }).catch(() => {
      this.pageState = CONSTANTS.PAGE_STATE.CONNECTION_ERROR;
    });
  }

  goToSettings() {
    this.pageState = CONSTANTS.PAGE_STATE.SETTINGS;
  }

  leaveSettings(saved?: boolean) {
    this.checkConnectivity();
  }

  mainboardError() {
    this.checkConnectivity();
  }
}

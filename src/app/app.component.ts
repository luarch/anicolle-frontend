import { Component } from '@angular/core';

import { Utils } from './utils';
import { BangumiService } from './services/bangumi-service';
import { SettingService } from './services/setting-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private utils: Utils,
    private bangumiSvc: BangumiService,
    private settingSvc: SettingService
  ) {

  }
  title = 'Anicolle R2 Frontend Dev';
}

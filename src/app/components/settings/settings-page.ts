import { Component, Output, EventEmitter } from '@angular/core';

import { Utils } from '../../utils';
import { CONSTANTS } from '../../constants';
import { SettingService, Setting } from '../../services/setting-service';

@Component({
  templateUrl: 'settings-page.html',
  selector: 'settings-page',
  styleUrls: ['settings-page.scss']
})
export class SettingsPage {
  setting: Setting;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() cancelled: EventEmitter<any> = new EventEmitter();

  constructor(
    private utils: Utils,
    private settingSvc: SettingService
  ) {
    this.setting = settingSvc.getSetting();
  }

  doSave() {
    this.settingSvc.updateSetting(this.setting);
    this.saved.emit();
  }

  doCancel() {
    this.cancelled.emit();
  }
}

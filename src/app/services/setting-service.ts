import { Injectable } from "@angular/core";

export interface Setting {
  url: string;
  token: string;
}

@Injectable()
export class SettingService {
  constructor() {}

  getSetting(): Setting {
    let setting: Setting = {
      url: localStorage.getItem("anicolleUrl"),
      token: localStorage.getItem("anicolleToken")
    };
    return setting;
  }

  updateSetting(setting: Setting): boolean{
    localStorage.setItem("anicolleUrl", setting.url);
    localStorage.setItem("anicolleToken", setting.token);
    return true;
  }
};

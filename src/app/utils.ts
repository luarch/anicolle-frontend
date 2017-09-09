import { Injectable } from "@angular/core";
import { CONSTANTS } from "./constants";

@Injectable()
export class Utils {
  constructor() {}

  joinUrl(base: string, endpoint: string) {
    base = base.trim();
    let baseEnd = base.length-1;
    if(base[baseEnd] === '/') {
      return base.concat(endpoint);
    } else {
      return base.concat('/').concat(endpoint);
    }
  }

  getCurrentWeekDay(): string {
    let date = new Date();
    let dayNum = date.getDay();
    if(dayNum == 0) dayNum = 7;
    return CONSTANTS.ON_AIR_DAY[dayNum];
  }

  onAirDayToString(on_air_day: number): string {
    return CONSTANTS.ON_AIR_DAY[on_air_day];
  }

  getOnAirDayDict(): any[] {
    let results = new Array();
    for(let i in CONSTANTS.ON_AIR_DAY) {
      results.push({key: i, value: CONSTANTS.ON_AIR_DAY[i]});
    }
    return results;
  }

  lockBody() {
    // TODO
  }

  unlockBody() {
    // TODO
  }
}

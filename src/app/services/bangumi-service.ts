import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { SettingService, Setting } from "./setting-service";
import { Utils } from "../utils";

export interface Bangumi {
  id: number,
  name: string,
  cur_epi: number,
  on_air_epi: number, // Placeholder
  on_air_day: number,
  seeker: string,
  seekers_obj: Seeker[]
}

export interface Seeker {
  seeker: string,
  chk_key: string
}

export interface BangumiCheckUp {
  link: string,
  title: string
}

@Injectable()
export class BangumiService {
  constructor(
    private http: Http,
    private settingSvc: SettingService,
    private utils: Utils
  ) {
  }

  private _getRequestOptions = (endpoint: string, isPostForm: boolean = false): RequestOptions => {
    let setting = this.settingSvc.getSetting();
    let requestOptions = new RequestOptions();
    requestOptions.url = this.utils.joinUrl(setting.url, endpoint);
    let headers = new Headers();
    headers.append("X-Auth-Token", setting.token);
    if(isPostForm) {
      headers.append("Content-Type", "multipart/form-data");
    }
    requestOptions.headers = headers;

    return requestOptions;
  }

  getAllBangumis = (): Promise<Bangumi[]> => {
    return new Promise<Bangumi[]>((resolve, reject) => {
      let requestOptions = this._getRequestOptions("get");

      this.http.get(requestOptions.url, requestOptions)
      .subscribe((res: Response) => {
        if(res.ok) {
          let results: Bangumi[] = res.json();
          for(let bangumi of results) {
            bangumi.seekers_obj = JSON.parse(bangumi.seeker);
          }
          resolve(results);
        } else {
          reject(new Error(res.statusText+': '+res.text()));
        }
      });
    });
  }

  getBangumiCheckUp = (b: Bangumi): Promise<BangumiCheckUp[]> => {
    return new Promise<BangumiCheckUp[]>((resolve, reject) => {
      let requestOptions = this._getRequestOptions("checkup/"+b.id);

      this.http.get(requestOptions.url, requestOptions)
      .subscribe((res: Response) => {
        if(res.ok) {
          let results: BangumiCheckUp[] = res.json();
          resolve(results);
        } else {
          reject(new Error(res.statusText+': '+res.text()));
        }
      });
    });
  }

  plusBangumi = (b: Bangumi): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      let requestOptions = this._getRequestOptions("plus/"+b.id);

      this.http.get(requestOptions.url, requestOptions)
      .subscribe((res: Response) => {
        if(res.ok) {
          let data = res.json();
          resolve(data.cur_epi);
        } else {
          reject(new Error(res.statusText+': '+res.text()));
        }
      });
    });
  }

  decreaseBangumi = (b: Bangumi): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      let requestOptions = this._getRequestOptions("decrease/"+b.id);

      this.http.get(requestOptions.url, requestOptions)
      .subscribe((res: Response) => {
        if(res.ok) {
          let data = res.json();
          resolve(data.cur_epi);
        } else {
          reject(new Error(res.statusText+': '+res.text()));
        }
      });
    });
  }

  updateBangumi = (b: Bangumi): Promise<Bangumi> => {
    return new Promise<Bangumi>((resolve, reject) => {
      let requestOptions = this._getRequestOptions("update/"+b.id, true);
      b.seeker = JSON.stringify(b.seekers_obj);
      let body = new FormData();
      body.append("name", b.name);
      body.append("cur_epi", b.cur_epi.toString());
      body.append("on_air", b.on_air_day.toString());
      body.append("seeker", b.seeker);

      this.http.post(requestOptions.url, body, requestOptions)
      .subscribe((res: Response) => {
        if(res.ok) {
          let result: Bangumi = res.json();
          result.seekers_obj = JSON.parse(result.seeker);
          resolve(result);
        } else {
          reject(new Error(res.statusText+': '+res.text()));
        }
      });
    });
  }

  createBangumi = (b: Bangumi): Promise<Bangumi> => {
    return new Promise<Bangumi>((resolve, reject) => {
      let requestOptions = this._getRequestOptions("add", true);
      b.seeker = JSON.stringify(b.seekers_obj);
      let body = new FormData();
      body.append("name", b.name);
      body.append("cur_epi", b.cur_epi.toString());
      body.append("on_air", b.on_air_day.toString());
      body.append("seeker", b.seeker);

      this.http.post(requestOptions.url, body, requestOptions)
      .subscribe((res: Response) => {
        if(res.ok) {
          let result: Bangumi = res.json();
          result.seekers_obj = JSON.parse(result.seeker);
          resolve(result);
        } else {
          reject(new Error(res.statusText+': '+res.text()));
        }
      });
    });
  }

  deleteBangumi = (b: Bangumi): Promise<null> => {
    return new Promise((resolve, reject) => {
      let requestOptions = this._getRequestOptions("remove/"+b.id);

      this.http.get(requestOptions.url, requestOptions)
      .subscribe((res: Response) => {
        if(res.ok) {
          resolve();
        } else {
          reject(new Error(res.statusText+': '+res.text()));
        }
      });
    });
  }

  getAllSeekers = (): Promise<Seeker[]> => {
    return new Promise<Seeker[]>((resolve, reject) => {
      let requestOptions = this._getRequestOptions("get_seekers");

      this.http.get(requestOptions.url, requestOptions)
      .subscribe((res: Response) => {
        if(res.ok) {
          let result: Seeker[] = res.json();
          resolve(result);
        } else {
          reject(new Error(res.statusText+': '+res.text()));
        }
      });
    });
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Utils } from './utils';
import { BangumiService } from './services/bangumi-service';
import { SettingService } from './services/setting-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [
    Utils,
    BangumiService, SettingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

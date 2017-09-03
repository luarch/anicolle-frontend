import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { Utils } from './utils';
import { BangumiService } from './services/bangumi-service';
import { SettingService } from './services/setting-service';

import { SettingsPage } from './components/settings/settings-page';

@NgModule({
  declarations: [
    AppComponent, SettingsPage
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule
  ],
  providers: [
    Utils,
    BangumiService, SettingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

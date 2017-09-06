import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { HotkeyModule } from 'angular2-hotkeys';

import { AppComponent } from './app.component';
import { Utils } from './utils';
import { BangumiService } from './services/bangumi-service';
import { SettingService } from './services/setting-service';

import { SettingsPage } from './components/settings/settings-page';
import { Mainboard, BangumiSearchPipe } from './components/mainboard/mainboard';
import { SearchBox } from './components/mainboard/search-box';
import { MobileSearchBox } from './components/mainboard/mobile-search-box';
import { Box } from './components/box/box';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';

@NgModule({
  declarations: [
    AppComponent, SettingsPage, Mainboard, Box, SearchBox, MobileSearchBox,
    BangumiSearchPipe,
    DetailModalComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,
    HotkeyModule.forRoot()
  ],
  providers: [
    Utils,
    BangumiService, SettingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

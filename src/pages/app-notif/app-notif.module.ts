import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppNotifPage } from './app-notif';

@NgModule({
  declarations: [
    AppNotifPage,
  ],
  imports: [
    IonicPageModule.forChild(AppNotifPage),
  ],
})
export class AppNotifPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendUserPage } from './send-user';

@NgModule({
  declarations: [
    SendUserPage,
  ],
  imports: [
    IonicPageModule.forChild(SendUserPage),
  ],
})
export class SendUserPageModule {}

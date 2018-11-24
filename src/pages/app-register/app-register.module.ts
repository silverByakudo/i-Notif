import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppRegisterPage } from './app-register';

@NgModule({
  declarations: [
    AppRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(AppRegisterPage),
  ],
})
export class AppRegisterPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonTabsPage } from './ion-tabs';

@NgModule({
  declarations: [
    IonTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(IonTabsPage),
  ],
})
export class IonTabsPageModule {}

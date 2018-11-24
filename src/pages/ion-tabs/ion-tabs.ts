import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireProvider } from '../../providers/fire/fire';
// import { UserData } from '../../models/user.interface';

@IonicPage()
@Component({
  selector: 'page-ion-tabs',
  templateUrl: 'ion-tabs.html',
})
export class IonTabsPage {

  public tabs = [
    {page:'AppHomePage', icon:'contact'},
    {page:'AppNotifPage', icon:'notifications'},
    {page:'AppGuidePage', icon:'paper'},
    {page:'AppReviePage', icon:'contacts'},
    {page:'AppAboutPage', icon:'help-circle'},
  ];
  /* declarations
  public admin = [
    {page:'AppHomePage', icon:'contact'},
    {page:'AppNotifPage', icon:'notifications'},
    {page:'AppGuidePage', icon:'paper'},
    {page:'AppReviePage', icon:'contacts'},
    {page:'AppAboutPage', icon:'help-circle'},
  ];

  public student = [
    {page:'AppHomePage', icon:'contact'},
    {page:'AppNotifPage', icon:'notifications'},
    {page:'AppGuidePage', icon:'paper'},
    {page:'AppReviePage', icon:'contacts'},
    {page:'AppAboutPage', icon:'help-circle'},
  ];

  public currentUser: UserData; */

  constructor(public navCtrl: NavController, public navParams: NavParams, public fire:FireProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IonTabsPage');
  }

  /* ionViewDidEnter() {
    this.fire.getUser().subscribe(user => {
      const Doc = this.fire.getDoc('userList', user.uid).valueChanges().subscribe(res => {
        this.currentUser = res;
        Doc.unsubscribe();
      });
    });
  } */

}

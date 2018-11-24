import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireProvider } from '../../providers/fire/fire';
import { NotifData } from '../../models/notif.interface';

@IonicPage()
@Component({
  selector: 'page-app-notif',
  templateUrl: 'app-notif.html',
})
export class AppNotifPage {

  public notifications: NotifData[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fire: FireProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppNotifPage');
  }

  ionViewDidEnter() {
    let uid = this.fire.getUser();
    const Spec = this.fire.getSpecollection("personalNotifs", "msgTarget", "==", uid).valueChanges().subscribe(res => {
      this.notifications = res.sort((a, b) => parseFloat(b.date) - parseFloat(a.date));
      Spec.unsubscribe();
    });
  }

}

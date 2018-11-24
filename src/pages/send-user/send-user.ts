import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonProvider } from '../../providers/common/common';
import { FireProvider } from '../../providers/fire/fire';
import { NotifData } from '../../models/notif.interface';

@IonicPage()
@Component({
  selector: 'page-send-user',
  templateUrl: 'send-user.html',
})
export class SendUserPage {

  public uid: string;
  public name: string;
  public sendUser: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public comm: CommonProvider, public fire: FireProvider, formBuilder: FormBuilder) {
    this.uid = navParams.get('id');
    this.name = navParams.get('name');
    this.sendUser = formBuilder.group({
      topic: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      message: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendUserPage');
  }

  sendPerNotif() {
    let loading = this.comm.loading(`Sending notification to ${this.name}`, true);
    loading.present().then(() => {
      let form = this.sendUser.value;
      let id = this.fire.createId();
      let inputData: NotifData = {
        msgTarget: this.uid,
        id: id,
        name: this.name,
        topic: form.topic,
        message: form.message,
        date: new Date().toDateString().substr(4)
      }
      console.log(inputData);
      this.fire.setDoc('personalNotifs', id, inputData).then(() => {
        loading.dismiss().then(() => {
          this.comm.toast(`Notice sent to ${this.name}.`).present().then(() => {
            this.navCtrl.pop();
          });
        });
        }, error => {
          loading.dismiss().then(() => {
            this.comm.toast(error.message).present();
          });
      });
    });
  }
  
  protected adjustTextArea(event: any): void {
    let textArea: any = event.target;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    return;
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email'
import { FireProvider } from '../../providers/fire/fire';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-app-reset',
  templateUrl: 'app-reset.html',
})
export class AppResetPage {

  public resetForm: FormGroup;
  public mail: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public comm: CommonProvider, public fire: FireProvider, formBuilder: FormBuilder) {
    this.mail = navParams.get('email');
    this.resetForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppResetPage');
  }

  sendReset() {
    let form = this.resetForm;
    if (form.valid) {
      this.fire.reset(form.value.email).then(() => {
        this.comm.toast(`A reset code has been sent to ${form.value.email}`);
      }, error => {
        this.comm.toast(error.message);
      });
    }
  }

  back() {
    this.navCtrl.pop();
  }

}

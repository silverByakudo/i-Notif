import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email'
import { FireProvider } from '../../providers/fire/fire';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-app-login',
  templateUrl: 'app-login.html',
})
export class AppLoginPage {

  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public comm: CommonProvider, public fire: FireProvider, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required])],
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppLoginPage');
  }

  loginUser() {
    let form = this.loginForm.value;
    if (this.loginForm.valid) {
      this.fire.signIn(form.email, form.password).then(() => {
        this.comm.toast(`Welcome ${form.email}!`).present();
      }, error => {
        this.comm.toast(error.message).present();
      });
    }
  }

  goToReset() {
    this.navCtrl.push('AppResetPage', {email: this.loginForm.value.email});
  }

  register() {
    this.navCtrl.push('AppRegisterPage', { email: this.loginForm.value.email });
  }

}

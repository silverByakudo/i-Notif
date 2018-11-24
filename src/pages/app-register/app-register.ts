import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email'
import { FireProvider } from '../../providers/fire/fire';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-app-register',
  templateUrl: 'app-register.html',
})
export class AppRegisterPage {

  public registerForm: FormGroup;
  public step: number = 1;
  public photo: any;
  public mail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public comm: CommonProvider, public fire: FireProvider, formBuilder: FormBuilder) {
    this.mail = navParams.get('email');
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      fName: ['', Validators.compose([Validators.required])],
      lName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      number: ['', Validators.compose([Validators.required, Validators.minLength(11)])],
      address:['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppRegisterPage');
  }

  registerUser() {
    let form = this.registerForm;
    if (form.valid) {
      let loading = this.comm.loading(`Registering ${form.value.email} to i-Notify database.`, true);
      loading.present().then(() => {
        this.fire.signUp(form.value.email, form.value.password).then(auth => {
          let id = auth.user.uid;
          this.fire.storePhoto(this.photo, form.value.email, form.value.number).then(res => {
            let path = res.ref.fullPath
            res.ref.getDownloadURL().then(url => {
              let profile= {path, url}
              // let id = this.fire.createId();
              this.fire.setDoc('userList', id, {
                id: id,
                email: form.value.email,
                fname: form.value.fName,
                lname: form.value.lName,
                number: form.value.number,
                address: form.value.address,
                type: 'student',
                photo: profile
              }).then(() => {
                this.comm.toast(`Welcome ${form.value.email}`).present();
                }, error => {
                  loading.dismiss().then(() => {
                    this.comm.toast(error.message).present();
                  });
              });
            }, error => {
              loading.dismiss().then(() => {
                this.comm.toast(error).present();
              });
            });
          }, error => {
            loading.dismiss().then(() => {
              this.comm.toast(error.message).present();
            });
          });
        }, error => {
          loading.dismiss().then(() => {
            this.comm.toast(error.message).present();
          });
        });
      });
    }
  }

  next() {
    this.step++;
  }

  getPic(bool:boolean) {
    this.comm.fromCamera(bool).then(imageData => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, error => {
      this.comm.toast(`${error.name}: ${error.message}`);
    });
  }
}

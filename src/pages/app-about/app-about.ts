import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonProvider } from '../../providers/common/common';
import { FireProvider } from '../../providers/fire/fire';
import { UserData } from '../../models/user.interface';

@IonicPage()
@Component({
  selector: 'page-app-about',
  templateUrl: 'app-about.html',
})
export class AppAboutPage {

  public edit: boolean = false;
  public form: FormGroup;
  public user: UserData;
  public content: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public comm: CommonProvider, public fire: FireProvider, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      content: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppAboutPage');
    this.fire.getDoc('app', 'about').valueChanges().subscribe(res => {
      this.content = res;
    });
  }

  ionViewDidEnter() {
    let uid = this.fire.getUser();
    const doc = this.fire.getDoc('userList', uid).valueChanges().subscribe(res => {
      this.user = res;
      doc.unsubscribe();
    });
  }

  save() {
    let loading = this.comm.loading('Updating database');
    loading.present().then(() => {
      this.fire.setDoc('app', 'about', {
        title: this.form.value.title,
        content: this.form.value.content,
        date: new Date().toDateString().substr(4)
      }).then(() => {
        loading.dismiss().then(() => {
          this.edit = false;
          this.comm.toast('Saved!').present();
        });
        }, error => {
          loading.dismiss().then(() => {
            this.comm.toast(error).present();
          });
      });
    });
  }

  editable(bool: boolean) {
    this.edit = bool;
  }

  protected adjustTextArea(event: any): void {
    let textArea: any = event.target;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    return;
  }

}  

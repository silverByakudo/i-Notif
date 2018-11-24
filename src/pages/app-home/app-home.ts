import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { UserData } from '../../models/user.interface';
import { CommonProvider } from '../../providers/common/common';
import { FireProvider } from '../../providers/fire/fire';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-app-home',
  templateUrl: 'app-home.html',
})
export class AppHomePage {

  public currentUser: UserData;
  public hideyo: boolean = true;
  public dash: string = 'send';
  public userList: UserData[];
  public show: boolean = false;
  /* public profile: boolean = false;
  public profileForm: FormGroup;
  public photo: any;*/
  public loaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public comm: CommonProvider, public fire: FireProvider /*, formBuilder: FormBuilder*/) {
    /*this.profileForm = formBuilder.group({
      fName: ['', Validators.compose([Validators.required])],
      lName: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required, Validators.minLength(11)])],
      address:['', Validators.compose([Validators.required])],
    });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppHomePage');
    this.loaded = true;
  }

  ionViewWillUnload() {
    this.loaded = false;
  }

  ionViewDidEnter() {
    let loading = this.comm.loading(`Loading user data...`);
    if (!this.loaded) {
      loading.present().then(() => {
        let uid = this.fire.getUser();
        const Doc = this.fire.getDoc('userList', uid).valueChanges().subscribe(res => {
          this.currentUser = res;
          // console.log(res);
          Doc.unsubscribe();
          loading.dismiss();
          if (this.currentUser.type == 'admin') {
            const fireList = this.fire.getCollection('userList', 'fname', "asc").valueChanges().subscribe(res => {
              this.userList = res;
              fireList.unsubscribe();
            });
          }
          /* else if (this.currentUser.type == 'student') {
                   this.profile = true;
                 } else if (!this.currentUser) {
                   this.show = true;
                 } */
        });
      });
    } else {
      let uid = this.fire.getUser();
      const Doc = this.fire.getDoc('userList', uid).valueChanges().subscribe(res => {
        this.currentUser = res;
        // console.log(res);
        Doc.unsubscribe();
        loading.dismiss();
        if (this.currentUser.type == 'admin') {
          const fireList = this.fire.getCollection('userList', 'fname', "asc").valueChanges().subscribe(res => {
            this.userList = res;
            fireList.unsubscribe();
          });
        }
        /* else if (this.currentUser.type == 'student') {
                 this.profile = true;
               } else if (!this.currentUser) {
                 this.show = true;
               } */
      });
    }
  }

  /*getPic(bool:boolean) {
    this.comm.fromCamera(bool).then(imageData => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, error => {
      this.comm.toast(`${error.name}: ${error.message}`);
    });
  }*/

  dashboard() {
    // this.navCtrl.push('DashboardPage');
    if (this.hideyo) {
      this.hideyo = false;
      this.show = true;
    } else {
      this.hideyo = true;
      this.show = false;
    }
    // this.hideyo = !this.hideyo;

  }
 
  delete(path: string, id:string) {
    try {
      this.fire.delDoc('userList', id).then(() => {
        this.fire.removePhoto(path);
      });
    } catch (error) {
      this.comm.toast(error.message).present();
    }
  }

  signOut() {
    this.fire.signOut();
  }

  modal(uid: string, fname: string, lname: string) {
    this.comm.presentModal('SendUserPage', { id: uid, name: `${fname} ${lname}` }).present();
  }

  call(number) {
    this.comm.calling(number);
  }

}

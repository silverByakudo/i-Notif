import { Injectable } from '@angular/core';
import { LoadingController, ToastController, Toast, Loading, Modal, ModalController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Injectable()
export class CommonProvider {

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public camera: Camera, public photoViewer: PhotoViewer, public callNumber: CallNumber, public modalCtrl: ModalController) {
  }

  toast(msg: string): Toast {
    return this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
  }

  loading(content: string, onPageChange?:boolean, enableBackdrop?: boolean): Loading {
    return this.loadingCtrl.create({
      content: content,
      dismissOnPageChange: onPageChange,
      enableBackdropDismiss: enableBackdrop,
    });
  }

  fromCamera(bool: boolean):Promise<any> {
    if (!bool) {
      let options: CameraOptions = {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        targetHeight: 400,
        targetWidth: 400,
      }
      return this.camera.getPicture(options);
    } else {
      let options: CameraOptions = {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        targetHeight: 400,
        targetWidth: 400,
      }  
      return this.camera.getPicture(options);
    }
  }

  viewPhoto(photo, title?:string) {
    return this.photoViewer.show(photo, title, {
      share: false
    });
  }

  calling(number: string) {
    return this.callNumber.callNumber(number, false);
  }

  presentModal(page:string, data:any): Modal {
    return this.modalCtrl.create(page, data);
  }
}

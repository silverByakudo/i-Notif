import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class FireProvider {

  constructor(public fore: AngularFirestore, public fauth: AngularFireAuth, public store: AngularFireStorage) {
  }

  getUser() {
    return this.fauth.auth.currentUser.uid;
  }

  signUp(email:string, password:string) {
    return this.fauth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.fauth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.fauth.auth.signOut();
  }

  reset(email:string) {
    return this.fauth.auth.sendPasswordResetEmail(email);
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  createId() {
    return this.fore.createId();
  }

  setDoc(dir: string, id:string, data:any) {
    return this.fore.doc(`${dir}/${id}`).set(data, { merge: true });
  }

  getDoc(dir: string, id: string): AngularFirestoreDocument {
    return this.fore.doc(`${dir}/${id}`);
  }

  delDoc(dir: string, id:string) {
    return this.fore.doc(`${dir}/${id}`).delete();
  }

  getCollection(dir:string, orderBy: string, direction: any): AngularFirestoreCollection {
    return this.fore.collection(dir, ref => ref.orderBy(orderBy, direction));
  }

  getSpecollection(dir: string, field:string, condition: any, query: string): AngularFirestoreCollection {
    return this.fore.collection(dir, ref => ref.where(field, condition, query));
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  storePhoto(photo, name:string, i:number):AngularFireUploadTask {
    let newName = `${new Date().getTime()}-${name}-${i}.jpg`;
    return this.store.ref(`images/${newName}`).putString(photo, 'data_url');
  }

  removePhoto(path:string) {
    return this.store.ref(path).delete();
  }
}
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import firebase from "firebase/compat/app";
import { Router } from '@angular/router';

import FieldValue = firebase.firestore.FieldValue;
@Injectable({
  providedIn: 'root'
})
export class Service {


  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public db: AngularFireDatabaseModule,
    public router: Router
  ) { }

  login(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  Register(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }
  saveDetails(data) {
    return this.firestore.collection("users").doc(data.email).set(data);
  }
  async logout() {
    return await this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    })
  }
  async addImgToDB(data) {

    var current = await this.auth.currentUser
    this.firestore.collection("users").doc(current.email).update({
      cqr: FieldValue.arrayUnion(data)


    })
  }
  async addImgqrToDB(data) {
    var current = await this.auth.currentUser
    this.firestore.collection("users").doc(current.email).update({
      qrname: FieldValue.arrayUnion(data.charAt(0).toUpperCase() + data.slice(1))


    })
  }
  async addQRData(data) {
    var current = await this.auth.currentUser
    this.firestore.collection("users").doc(current.email).update({
      qr: FieldValue.arrayUnion(data)


    })
  }
  async deleteSavedQrDB(item) {
    var current = await this.auth.currentUser
    this.firestore.collection("users").doc(current.email).update({
      qr: FieldValue.arrayRemove(item)

    })
  }
  async deleteCreatedQrDB(item) {
    var current = await this.auth.currentUser
    this.firestore.collection("users").doc(current.email).update({
      cqr: FieldValue.arrayRemove(item)
    });

  }
  async deleteQrNameDB(item) {
    var current = await this.auth.currentUser
    this.firestore.collection("users").doc(current.email).update({
      qrname: FieldValue.arrayRemove(item)
    });

  }
  getDB() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const result = this.firestore.collection("users").doc(user.email)
        var userprofile = result.valueChanges();
        return userprofile;
      }


    })
  }
}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Service } from '../services/services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  reference: any;
  name: any;
  email: any;
  qr: [];
  cqr: [];
  qrname: [];
  constructor(private Alert: AlertController, private router: Router, private db: AngularFirestore, public auth: AngularFireAuth, public ser: Service) {
    auth.onAuthStateChanged(user => {
      if (user) {
        const result = db.collection("users").doc(user.email)
        var userprofile = result.valueChanges();
        userprofile.subscribe(res => {
          this.email = res["email"];
          this.name = res["name"];
          this.qr = res["qr"];
          this.cqr = res["cqr"];
          this.qrname = res["qrname"];
        })

      }


    }).catch((error) => {
      console.log(error);
    });
  }
  showConfirmAlert() {
    this.Alert.create({
      header: 'Confirm Logout',
      message: 'Did you want to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.ser.logout()

          }
        }
      ],
    }).then(alert => alert.present());
  }
   deleteQrDB(item) {
    this.ser.deleteSavedQrDB(item);
  }
   deleteImgDB(item) {
    this.ser.deleteCreatedQrDB(item);
  }
   deleteqrnameDB(item) {
    this.ser.deleteQrNameDB(item);

  }
}

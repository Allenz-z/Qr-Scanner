import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import html2canvas from 'html2canvas';
import { Service } from '../services/services.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  buttonClicked: boolean=true;
  elementType = NgxQrcodeElementTypes.IMG;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  capturedQRImage;
  name:any;
  constructor( private Alert:AlertController,private ser:Service) { }
  async showConfirmAlert() {
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
    }).then(alert=> alert.present());
  }
  create() {
    this.buttonClicked = false;
}
async presentAlert() {
 await this.Alert.create({
    header: 'Missing Fields',
    message: 'Please fill in the fields!',
    buttons: ['OK'],
  }).then(alert=> alert.present());
}
async save() {
  this.Alert.create({
  header: 'Save',
  message: 'Did you want to save QR Code?',
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
        this.saveQrCode()
        this.name=''
        this.value=''
      }
    }
  ],
}).then(alert=> alert.present());
}
saveQrCode() {
  if(this.name&&this.value){

  html2canvas(document.querySelector("#qrcode")).then(canvas => {
    this.capturedQRImage = canvas.toDataURL();
    this.ser.addImgToDB(this.capturedQRImage)
    this.buttonClicked = true;
  });
  this.ser.addImgqrToDB(this.name);
}else{
  this.presentAlert()
}
}

}


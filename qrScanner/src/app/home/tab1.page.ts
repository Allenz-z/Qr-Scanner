import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { Service } from '../services/services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  display: boolean= false;
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  constructor(private barcodeScanner: BarcodeScanner, private Alert: AlertController,private ser:Service) {
    
   }
  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      this.scannedData = barcodeData;
      if(this.scannedData.text.includes('http')){
        this.display=true
      }
      else{this.display=false}
      this.ConfirmSave(barcodeData.text)

    }).catch(err => {
      console.log('Error', err);
    });
  }

  async ConfirmSave(data) {
    this.Alert.create({
      header: 'Save',
      message: 'Did you want to save it?',
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
            this.ser.addQRData(data)
          }
        }
      ],
    }).then(alert => alert.present());
  }
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
    }).then(alert => alert.present());
  }
  
}
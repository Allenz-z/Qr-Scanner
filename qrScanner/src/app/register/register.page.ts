import { Component, OnInit } from '@angular/core';
import { Service } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email: any;
  public password: any;
  public name: any;
  constructor(
    public router: Router,
    public Auth: Service
  ) { }

  ngOnInit() {
  }
  async signup() {
    this.Auth.Register({ email: this.email, password: this.password })
      .then(res => {
        if (res.user.uid) {
          let data = {
            email: this.email.toLowerCase(),
            name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
            qr:[],
            cqr:[],
            qrname:[],
          }
          this.Auth.saveDetails(data).then(res => {
            this.router.navigateByUrl('/login',{replaceUrl:true});
          }, err => {
            console.log(err);
          })
        }
      }, err => {
    
        console.log(err);
      })
  }

}

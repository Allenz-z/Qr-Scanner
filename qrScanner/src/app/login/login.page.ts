import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../services/services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  public email: any;
  public password: any;
  constructor(
    public router: Router,
    public auth: Service
  ) { }


  login() {
    this.auth.login({ email: this.email, password: this.password})
      .then(res => {
        if (res.user.email) {
          this.router.navigateByUrl('/tabs',{replaceUrl:true});
        }
      }, 
      err => {
        alert("This username or password is invalid")
        console.log(err);
      })
  }
  goRegister(){
    this.router.navigateByUrl('/register');
  }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController,} from 'ionic-angular';
import {Http,Headers } from "@angular/http";
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Network} from '@ionic-native/network';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import {environment} from '../../config/environment';
import {SelectPage} from '../select/select';

let url = environment.url;

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  phonenumber:string;
  password:string;
  loading: any; 
  url: string;
   
    // constructor will excutes first  when page loads
    constructor(platform: Platform,public navCtrl: NavController, public http:Http,public network: Network,public navParams: NavParams, 
      public loadingController:LoadingController,private alertCtrl: AlertController,  ) {
        this.url = url;
        window.localStorage.clear();
        this.network.onDisconnect().subscribe(()=>{
          let alert=this.alertCtrl.create({
            title:' ERROR',
            message:'Please check your Internet Connection and try again.',
            buttons:[{text:"ok",handler:()=>{
              platform.exitApp();
            }}]
          })
          alert.present();
            })
   
    }
    createAccount() {
      this.navCtrl.push(SignupPage); 
    }
    //login method to request to the server and write the response for user authentication
  
    public login() {
       this.loading = this.loadingController.create({ content: "Please Wait..." });
      this.loading.present();
      let headers =new Headers();
      headers.append('Content-Type','application/json');
   var phonenumber= this.phonenumber;
     var password=this.password;
    let postData={
  phonenumber:this.phonenumber,
  password:this.password,
  
  };
  this.http.post(this.url+"/api/userlogin",postData,{headers:headers}).map(res =>res.json())
  .subscribe(data =>{
  if(data.status=='200'){
    this.loading.dismissAll();
    window.localStorage.setItem("username", data.username);
    window.localStorage.setItem("phonenumber",this.phonenumber);
   window.localStorage.setItem("password",this.password);
  window.localStorage.setItem("jwt",data.token);
  this.navCtrl.setRoot(SelectPage);
  
  }
  else{
    this.loading.dismissAll();
    let alert=this.alertCtrl.create({
      title:' ERROR',
      message:'Please Enter Valid Details.',
      buttons:[{text:"ok",handler:()=>{
        alert.dismiss();
      }}]
    })
    alert.present();
  }
  
  },error =>{
  console.log(error);
  });
  }
  }
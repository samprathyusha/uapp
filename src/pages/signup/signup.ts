import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Http,Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import {Network} from '@ionic-native/network';
import {environment} from '../../config/environment';
let url = environment.url;

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  username:string;
  branchname:string;
  mailid:string;
  phonenumber:string;
  password:string;
  loading:any;
  url:string;
  
    constructor(platform: Platform,public navCtrl: NavController,public alertCtrl:AlertController,public network: Network,public loadingController:LoadingController, 
      public http:Http,public navParams: NavParams) {
        this.url=url;
  
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
  
    
    login(){
      this.navCtrl.push(LoginPage);
      var index=1;
      this.navCtrl.remove(index);
    }
    register(form){
      this.loading=this.loadingController.create({content: "Registering User,please wait..."});
      this.loading.present();
      alert(JSON.stringify(form.value));
     // var datafrom=JSON.stringify(form.value);
  
    let headers =new Headers();
   headers.append('Content-Type','application/json');
  
  
   this.http.post(this.url+"/api/userregister",JSON.stringify(form.value),{headers:headers}).map(res =>res.json())
   .subscribe(data =>{
   console.log(data);
  if(data=='inserted'){
    this.loading.dismissAll();
  
  
   this.navCtrl.setRoot(LoginPage);
  
   }
  
  
  else if( data=='phonenumber exist'){
    
    let alert=this.alertCtrl.create({
      title:' ERROR',
      message:'Phonenumber Exists.',
      buttons:[{text:"ok",handler:()=>{
        
      }}]
    })
    alert.present();
  
    this.loading.dismissAll();
  }
  
  
  else if( data=='branchname exist'){
    
    let alert=this.alertCtrl.create({
      title:' ERROR',
      message:'Branch already Exists.',
      buttons:[{text:"ok",handler:()=>{
        
      }}]
    })
    alert.present();
    this.loading.dismissAll();
  }
  
  
  else if( data=='mailid exist'){
    
    let alert=this.alertCtrl.create({
      title:' ERROR',
      message:'Mailid Exists.',
      buttons:[{text:"ok",handler:()=>{
        
      }}]
    })
    alert.present();
    this.loading.dismissAll();
  }
  
   else{
  
   let alert=this.alertCtrl.create({
    title:' ERROR',
    message:'Something Went Wrong, Please try again.',
    buttons:[{text:"ok",handler:()=>{
      alert.dismiss();
    }}]
  })
  alert.present();
   this.navCtrl.setRoot(SignupPage);
  }
  
  
  },error =>{
  console.log(error);
  });
     
  
   }
  
  }
  
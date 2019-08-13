import { Component } from '@angular/core';
import { Platform ,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import {Network} from '@ionic-native/network';
import { HomePage } from '../pages/home/home';
import {SelectPage} from '../pages/select/select';
import {InvalidPage} from '../pages/invalid/invalid';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
rootPage:any='';
  //  rootPage=InvalidPage;
  username:string;
  phonenumber:string;

  constructor(public platform: Platform,public alertctrl:AlertController, public statusBar: StatusBar,private network:Network,
    public splashScreen: SplashScreen) {
     if(this.network.type=='none'){
       let alert=this.alertctrl.create({
         title:' ERROR',
         message:'Please check your Internet Connection and try again.',
         buttons:[{text:"ok",handler:()=>{
           platform.exitApp();
         }}]
       })
       alert.present();
     }
     this.network.onDisconnect().subscribe(()=>{
       let alert=this.alertctrl.create({
         title:' ERROR',
         message:'Please check your Internet Connection and try again.',
         buttons:[{text:"ok",handler:()=>{
           platform.exitApp();
         }}]
       })
       alert.present();
         })
   this.initializeApp();
    // checking local storage  
    if(window.localStorage.getItem("phonenumber")==null&& window.localStorage.getItem("password")==null){
     this.rootPage=LoginPage;
           }
           else if(window.localStorage.getItem("phonenumber")!=null&& window.localStorage.getItem("password")!=null){
     this.rootPage=SelectPage;
           }


  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}


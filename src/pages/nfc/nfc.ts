import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController,Nav } from 'ionic-angular';
import { NFC, Ndef } from "@ionic-native/nfc";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ValidPage } from '../valid/valid';
import { InvalidPage } from '../invalid/invalid';
import {environment} from '../../config/environment';
import {AssetrefProvider} from '../../providers/assetref/assetref';
import {HomePage} from '../home/home';
import {SelectPage} from '../select/select';
import { Subscription } from 'rxjs/Rx';
let url = environment.url;

/**
 * Generated class for the NfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html',
})
export class NfcPage {
  @ViewChild(Nav) nav: Nav;
  tagId: string;
  tagdata: string;
  newscreen:boolean;
  loading:any;
  url: string;
  tagpayload:any;
  tagformat:any;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(platform: Platform, public alertCtrl: AlertController, public network: Network, public navCtrl: NavController, 
    public loadingController: LoadingController, public navParams: NavParams, private nfc: NFC, private ndef: Ndef,
     private http: Http, private assetref:AssetrefProvider) 
{
this.url = url;

this.network.onDisconnect().subscribe(() => {
let alert = this.alertCtrl.create({
title: ' ERROR',
message: 'Please check your Internet Connection and Try again.',
buttons: [{
text: "ok", handler: () => {
  platform.exitApp();
}
}]
})
alert.present();
})
this.resetScanData();
}
resetScanData() {
this.tagId = "";
this.start();
}


start() {
this.nfc.enabled().then((resolve) => {
this.addListenNFC();
}).catch((reject) => {
if(reject=='NO_NFC'){
let alert = this.alertCtrl.create({
  title: ' ERROR',
  message: 'NFC is not available in your device. Please come up with a NFC Enabled device to avoid this message.',
  buttons: [{
    text: "ok", handler: () => {
      this.navCtrl.setRoot(SelectPage);
    }
  }]
})
alert.present();

}
else if(reject == 'NFC_DISABLED'){
let alert = this.alertCtrl.create({
  title: ' ERROR',
  message: 'Please enable NFC to avoid this message.',
  buttons: [{
    text: "ok", handler: () => {
      this.navCtrl.setRoot(SelectPage);
    }
  }]
})
alert.present();
}
});


}
addListenNFC() {
this.subscriptions.push(
this.nfc.addNdefListener().subscribe(data => {
if (data && data.tag && data.tag.id) {
let tagId = this.nfc.bytesToHexString(data.tag.id);
//  let payload =data.tag.ndefMessage[0].payload;
//let tagContent =this.nfc.bytesToString(payload).substring(3);
//this.tagpayload=this.nfc.bytesToString(payload);
this.tagId = tagId;
//this.tagdata= tagContent;

if (tagId) { 

this.loading = this.loadingController.create({ content: "Verifying Tag, Please wait..." });
this.loading.present();
var Data={
 Tagid:this.tagId,
   tagdata:'bypass',
   productid:'bypass',
   tagtype:'nonreusable',
   tagformat:this.tagId    
}
//  alert(JSON.stringify(Data));
this.requestserver(Data);

}
else {
alert('NFC NOT DETECTED');
}
}else{
alert("please read valid nfc");
}
})
);

}

requestserver(dataa){
// this.subscriptions.forEach(sub=>{
//   sub.unsubscribe();
// })
var token=window.localStorage.getItem('jwt');
let headers =new Headers();
headers.append('authorization',token);

this.http.post( this.url +'/api/checkseedstag',dataa,{headers:headers})
.map(res =>res.json()).subscribe(data =>{

// alert(JSON.stringify(data));
if(data=='DataExistAndDeliver'){
this.assetref.saveassetname(this.tagId);
this.navCtrl.setRoot(ValidPage, {details:data});
this.loading.dismissAll();

}

else if(data=='DataExistAndNotDeliver'){
this.assetref.saveassetname(this.tagId);
this.navCtrl.setRoot(ValidPage, {details:data});
this.loading.dismissAll();

}
else if(data=='DataDoNotExist'){
this.navCtrl.setRoot(InvalidPage);
this.loading.dismissAll();
}
// else if(data.multichain=='DataDoNotExist' && data.mongo=='DataExist'){
//   this.navCtrl.setRoot(InvalidPage,{details:data});
//   this.loading.dismissAll();
// }
//  else if(data.multichain=='DataExist' && data.mongo=='DataExist'&& data.status=='Tamper'){
//     this.navCtrl.setRoot(InvalidPage,{details:data});


//     this.loading.dismissAll();
//   }
// else if(data=="this tag is not matching with product id"){
//   alert("Tag Does not Exist");
//   this.loading.dismissAll();
//   this.navCtrl.setRoot(ScannfcPage)
// }
// else if(data=="NotAValidTag"){
//   let alert = this.alertCtrl.create({
//     title: ' ERROR',
//     message: ' Not a Valid Tag.',
//     buttons: [{
//       text: "ok", handler: () => {
//         this.navCtrl.setRoot(ScannfcPage);
//       }
//     }]
//   })
//   alert.present();
// }
// else if(data=="productid is not found"){
//   alert("Product ID not Matched");
//   this.loading.dismissAll();
//   this.navCtrl.setRoot(ScannfcPage);
// }


},error =>{
console.log(error);
alert(error);
})
}

ionViewWillLeave(){
this.subscriptions.forEach(sub=>{
sub.unsubscribe();
})
}




}

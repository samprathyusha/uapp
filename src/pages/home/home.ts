import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { ValidPage } from '../valid/valid';
import { InvalidPage } from '../invalid/invalid';
import {environment} from '../../config/environment';
import {AssetrefProvider} from '../../providers/assetref/assetref';
import { Subscription } from 'rxjs/Rx'
let url = environment.url;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scanning: boolean;
  url:string;
  loading: any;
  barcode: any;
  datacontent: any;
  data: any;
  barcodeloading:any;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    platform: Platform, public alertCtrl: AlertController, public network: Network, 
    private barcodescanner: BarcodeScanner, public loadingController: LoadingController, private http: Http,public assetref:AssetrefProvider)
     {
 
    this.url=url;
    this.network.onDisconnect().subscribe(() => {
      let alert = this.alertCtrl.create({
        title: ' ERROR',
        message: 'Please check your Internet Connection and try again.',
        buttons: [{
          text: "ok", handler: () => {
            platform.exitApp();
          }
        }]
      })
      alert.present();
    })
    this.scanBarcode();
    this.scanning = true;
  }

  scanBarcode() {
    this.barcodescanner.scan().then(result => {
     var bardata = result.text;
     this.barcode=bardata;
      if(bardata==""){
        alert("barcode empty");
      }
      else{
        this.loading = this.loadingController.create({ content: "Verifying Tag, Please wait..." });
        this.loading.present();
         var Data={
           Tagid:bardata,
             tagdata:'bypass',
             productid:'bypass',
             tagtype:'nonreusable',
             tagformat:bardata   
         }
         
        //  alert(JSON.stringify(Data));
         this.requestserver(Data);

      }
    })
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

      //  alert(JSON.stringify(data));
    if(data=='DataExistAndDeliver'){
        this.assetref.saveassetname(this.barcode);
        this.navCtrl.setRoot(ValidPage, {details:data});
       this.loading.dismissAll();
      
     }

    else if(data=='DataExistAndNotDeliver'){
      alert(data);
      this.assetref.saveassetname(this.barcode);
       this.navCtrl.setRoot(ValidPage, {details:data});
      // this.navCtrl.setRoot(ValidPage);
     this.loading.dismissAll();
    
   }
     else if(data=='DataDoNotExist'){
       this.navCtrl.setRoot(InvalidPage);
      this.loading.dismissAll();
     }
    

    
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

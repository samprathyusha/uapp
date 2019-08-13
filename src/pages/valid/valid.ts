import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AssetrefProvider } from '../../providers/assetref/assetref';
import {ResultPage} from '../result/result';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from '../../config/environment';
import { HomePage } from '../home/home';
import {InvalidPage} from '../invalid/invalid';
let url = environment.url;

/**
 * Generated class for the ValidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-valid',
  templateUrl: 'valid.html',
})
export class ValidPage {

  details:any;
  recordid:string;
  tamperid:string;
  url: string;
  loading:any;
  productdetails:string;
  data='valid';
  assetowner:boolean;
  delivered:boolean;
  assetname:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertctrl:AlertController,private http: Http, public loadingController: LoadingController,
      public modal:ModalController, public assetref:AssetrefProvider) {
    this.details=this.navParams.get("details"); 
    alert(this.details);
    this.assetname=this.assetref.getassetname();

    this.url = url;
    if(this.details=="DataExistAndDeliver"){
this.assetowner=false;
    }else if(this.details=="DataExistAndNotDeliver"){
this.assetowner=true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValidPage');
  }
  checkNext(){
    this.navCtrl.setRoot(HomePage);
  }
 

  deliver(){


    let alert = this.alertctrl.create({
      title: ' CONFORMATION',
      message: 'ARE YOU SURE TO DELIVER.',
      buttons: [{
        text: "YES", handler: () => {
          this.servercode();
        }
        

      },
      {
        text: "NO", handler: () => {
          this.navCtrl.setRoot(HomePage);
        },
        

      },
    
    
    ]
    })
    alert.present();

  }
  


servercode(){
  this.loading = this.loadingController.create({ content: "Verifying Tag, Please wait..." });
  this.loading.present();
  var Data={
    Tagid:this.assetname,
      tagdata:'bypass',
      productid:'bypass',
      tagtype:'nonreusable',
      tagformat:this.assetname   
  }
  

    var token=window.localStorage.getItem('jwt');
    let headers =new Headers();
    headers.append('authorization',token);
        
    this.http.post( this.url +'/api/checkseedstag',Data,{headers:headers})
    .map(res =>res.json()).subscribe(data =>{
  
        //  alert(JSON.stringify(data));
      if(data=='DataExistAndNotDeliver'){
   var dataofjson={
         productid:this.assetname,    
   }
   let headers =new Headers();
   headers.append('authorization',token);
   this.http.post(this.url+"/api/burnthisasset",dataofjson, { headers: headers }).map(res => res.json()).subscribe(data=>{
if(data=="asset sucessfully burnt"){
    this.navCtrl.push(ResultPage);
    this.loading.dismissAll();
  
}else {
  
  this.loading.dismissAll();
  let alertt = this.alertctrl.create({
    title: ' CHECK',
    message: 'PLEASE TRY TO RESCAN OR CHECK LOGIN DETAILS.',
    buttons: [{
     

    
      text: "OK", handler: () => {
        this.navCtrl.setRoot(HomePage);

      },
      

    }
  
  
  ]
  })
  alertt.present();


}
   })
        
       }
  
      else if(data=='DataExistAndDeliver'){
        
        this.loading.dismissAll();
        this.navCtrl.setRoot(InvalidPage, {details:data});
       
      
     }
       else if(data=='DataDoNotExist'){
         
         this.loading.dismissAll();
         this.navCtrl.setRoot(InvalidPage);
        
       }
      
  
      
     },error =>{
      console.log(error);
      alert(error);
     })
}

}

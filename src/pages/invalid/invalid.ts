import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {SelectPage} from '../select/select';

/**
 * Generated class for the InvalidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invalid',
  templateUrl: 'invalid.html',
})
export class InvalidPage {
  tamper:boolean;
  blockchain:boolean;
  details:any;
  recordid:string;
  tamperid:string;
  productdetails:string;
  assetowner:boolean;
  delivery:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

}

checkNext(){
  this.navCtrl.push(SelectPage);
}

}


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NfcPage } from '../nfc/nfc';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPage');
  }
  scannfc(){
this.navCtrl.push(NfcPage)
  }
scanqr(){
this.navCtrl.push(HomePage)
}

logout(){
  window.localStorage.clear();
  this.navCtrl.push(LoginPage)
}
}

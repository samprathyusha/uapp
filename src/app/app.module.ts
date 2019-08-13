import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Select } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import{LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import{ValidPage} from '../pages/valid/valid';
import {InvalidPage} from '../pages/invalid/invalid';
import {ResultPage} from '../pages/result/result';
import {NfcPage} from '../pages/nfc/nfc';
import {SelectPage} from '../pages/select/select';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpModule} from '@angular/http';
import {FormsModule}from '@angular/forms';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Network}from '@ionic-native/network';
import { AssetrefProvider } from '../providers/assetref/assetref';
import { NFC, Ndef } from '@ionic-native/nfc';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ValidPage,
    InvalidPage,
    ResultPage,
    SelectPage,
    NfcPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ValidPage,
    InvalidPage,
    NfcPage,
    SelectPage,
    ResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Network,
    NFC,Ndef,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AssetrefProvider
  ]
})
export class AppModule {}

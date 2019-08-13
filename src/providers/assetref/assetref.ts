import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AssetrefProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AssetrefProvider {

  assetname:string;
validorreturn:string;
  constructor() {
    console.log('Hello AssetrefProvider Provider');
  }

  saveassetname(str){
    this.assetname=str;

  }
  getassetname(){
    return this.assetname;
  }

  settransaction(value){
    this.validorreturn=value;

  }

  gettransaction(){
    return this.validorreturn;
  }
}

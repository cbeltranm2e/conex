import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UsuarioProvider} from "../../providers/usuario/usuario";

import { RootPage } from "../index.paginas";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  idsocio:string= "";
  contrasena:string= "";
  loginerror: boolean;
  datos:any[]=[];



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _us: UsuarioProvider) {
  }

  ingresar(){
    this._us.ingresar(this.contrasena, this.idsocio)
            .subscribe( val => {
              if ( !val ){
                this.navCtrl.push( RootPage );
              }
            });

  }

}

import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';

//import { MetProvider } from "../../providers/met/met";

import { BalancecajaPage, OcupacionPage,IngresometPage,BalancesalaPage } from "../index.paginas";

@Component({
  selector: 'page-sala',
  templateUrl: 'sala.html',
})
export class SalaPage {

  sala:any={};
  balancecajaPage = BalancecajaPage;
  ocupacionPage = OcupacionPage;
  ingresometPage = IngresometPage;
  balancesalaPage = BalancesalaPage;

  constructor( private navParams: NavParams, public navCtrl: NavController) {
    //console.log ( navParams );
    //this.sala=this.navParams.get("sala");
      console.log(this.navParams.get("sala"));
      this.sala = this.navParams.get("sala");

  }
}

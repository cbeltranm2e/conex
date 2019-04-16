import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SalaPage } from "../sala/sala";

import { MetProvider } from "../../providers/met/met";
import { UsuarioProvider} from "../../providers/usuario/usuario";

@Component({
  selector: 'page-root',
  templateUrl: 'root.html',
})
export class RootPage {

  salaPage = SalaPage;
/*
  salas:any[] = [
  { idsala:"002",
    direccion:"Calle 2 No 2-2",
    nombre:"La playita 2",
    numerosalas:"2"
  },
  { idsala:"004",
    direccion:"Calle 4 No 4-4",
    nombre:"La playita 4",
    numerosalas:"4"
  },
  { idsala:"005",
    direccion:"Calle 5 No 5-5",
    nombre:"La playita 5",
    numerosalas:"5"
  }
]
*/

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _us: UsuarioProvider,
              public _mp: MetProvider) {

    console.log(' RootPage Cargar y leer Storage');




  }

/*
  irPaginaSala ( sala:any){
      console.log ( this.sala );
      //this.navCtrl.push( SalaPage,{ 'sala': sala } );
    }
*/
}

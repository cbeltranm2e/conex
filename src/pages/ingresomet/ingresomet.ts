import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
//import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from "../../config/url.servicios";

import { MetProvider } from "../../providers/met/met";


@Component({
  selector: 'page-ingresomet',
  templateUrl: 'ingresomet.html',
})
export class IngresometPage {

  sala:any={};
  salasactual:any[]=[];

  token:string;
  idsocio:string;

  billetero1:number=0;
  billetero2:number=0;
  billetero3:number=0;
  billetero4:number=0;
  billetero5:number=0;

  dinerobilletero1:number=0;
  dinerobilletero2:number=0;
  dinerobilletero3:number=0;
  dinerobilletero4:number=0;
  dinerobilletero5:number=0;

  marcabilletero1:string='';
  marcabilletero2:string='';
  marcabilletero3:string='';
  marcabilletero4:string='';
  marcabilletero5:string='';

  juegobilletero1:string='';
  juegobilletero2:string='';
  juegobilletero3:string='';
  juegobilletero4:string='';
  juegobilletero5:string='';

  totalbilleteros:string="";
  hora:string="";




  constructor(  public navParams: NavParams,
                private _mp: MetProvider,
                public http: Http) {
    console.log(' RootPage Cargar y leer Storage Ingreso Met');

    this.sala= this.navParams.get("sala");

    this._mp.cargar_storage();
    //this._mp.cargar_todos_pagina();
    // Load data
    let url = URL_SERVICIOS + "/conexdata/obtener_data/" + this._mp.token +"/" + this._mp.idsocio;

    this.salasactual= [];

        //console.log(this.sala.sala);


    this.http.get( url )
             .map( resp => resp.json() )
             .subscribe ( data =>{
               //console.log(data);
               if ( data.error){
                 // Aqui error
               }else{
                 this.salasactual.push( ... data.conexdata);

                 for (var _i = 0; _i < this.salasactual.length; _i++) {
                      //var num = this.salasactual[_i];
                      if (this.salasactual[_i].sala == this.sala.sala ){
                          //console.log(num);

                          this.billetero1=this.salasactual[_i].billetero1;
                          this.billetero2=this.salasactual[_i].billetero2;
                          this.billetero3=this.salasactual[_i].billetero3;
                          this.billetero4=this.salasactual[_i].billetero4;
                          this.billetero5=this.salasactual[_i].billetero5;

                          this.dinerobilletero1=this.salasactual[_i].dinerobilletero1;
                          if ((this.dinerobilletero1<0) || (this.dinerobilletero1 > 999999) ){this.dinerobilletero1=0};
                          this.dinerobilletero2=this.salasactual[_i].dinerobilletero2;
                          if ((this.dinerobilletero2<0) || (this.dinerobilletero2 > 999999) ){this.dinerobilletero2=0};
                          this.dinerobilletero3=this.salasactual[_i].dinerobilletero3;
                          if ((this.dinerobilletero3<0) || (this.dinerobilletero3 > 999999) ){this.dinerobilletero3=0};
                          this.dinerobilletero4=this.salasactual[_i].dinerobilletero4;
                          if ((this.dinerobilletero4<0) || (this.dinerobilletero4 > 999999) ){this.dinerobilletero4=0};
                          this.dinerobilletero5=this.salasactual[_i].dinerobilletero5;
                          if ((this.dinerobilletero5<0) || (this.dinerobilletero5 > 999999) ){this.dinerobilletero5=0};


                          this.marcabilletero1=this.salasactual[_i].marcabilletero1;
                          this.marcabilletero2=this.salasactual[_i].marcabilletero2;
                          this.marcabilletero3=this.salasactual[_i].marcabilletero3;
                          this.marcabilletero4=this.salasactual[_i].marcabilletero4;
                          this.marcabilletero5=this.salasactual[_i].marcabilletero5;

                          this.juegobilletero1=this.salasactual[_i].juegobilletero1;
                          this.juegobilletero2=this.salasactual[_i].juegobilletero2;
                          this.juegobilletero3=this.salasactual[_i].juegobilletero3;
                          this.juegobilletero4=this.salasactual[_i].juegobilletero4;
                          this.juegobilletero5=this.salasactual[_i].juegobilletero5;

                          this.hora=this.salasactual[_i].fechahora;

                          this.totalbilleteros=this.salasactual[_i].totalbilleteros;
                          //this.totalbilletero=  `${ parseInt(this.salasactual[_i].dinerobilletero1) + parseInt(this.salasactual[_i].dinerobilletero2) + parseInt(this.salasactual[_i].dinerobilletero3) + parseInt(this.salasactual[_i].dinerobilletero4) + parseInt(this.salasactual[_i].dinerobilletero5)}`;
                        }
                      }
                }

             })
  }


    cargar_pagina ( ){

      this._mp.cargar_storage();
      //this._mp.cargar_todos_pagina();
      // Load data
      let url = URL_SERVICIOS + "/conexdata/obtener_data/" + this._mp.token +"/" + this._mp.idsocio;

      this.salasactual= [];

      console.log('Funcion cargar todos pagina');
      console.log(this.sala.sala);


      this.http.get( url )
               .map( resp => resp.json() )
               .subscribe ( data =>{
                 //console.log(data);
                 if ( data.error){
                   // Aqui error
                 }else{
                   this.salasactual.push( ... data.conexdata);

                   for (var _i = 0; _i < this.salasactual.length; _i++) {
                        //var num = this.salasactual[_i];
                        if (this.salasactual[_i].sala == this.sala.sala ){
                            //console.log(num);

                            this.billetero1=this.salasactual[_i].billetero1;
                            this.billetero2=this.salasactual[_i].billetero2;
                            this.billetero3=this.salasactual[_i].billetero3;
                            this.billetero4=this.salasactual[_i].billetero4;
                            this.billetero5=this.salasactual[_i].billetero5;

                            this.dinerobilletero1=this.salasactual[_i].dinerobilletero1;
                            if ((this.dinerobilletero1<0) || (this.dinerobilletero1 > 999999) ){this.dinerobilletero1=0};
                            this.dinerobilletero2=this.salasactual[_i].dinerobilletero2;
                            if ((this.dinerobilletero2<0) || (this.dinerobilletero2 > 999999) ){this.dinerobilletero2=0};
                            this.dinerobilletero3=this.salasactual[_i].dinerobilletero3;
                            if ((this.dinerobilletero3<0) || (this.dinerobilletero3 > 999999) ){this.dinerobilletero3=0};
                            this.dinerobilletero4=this.salasactual[_i].dinerobilletero4;
                            if ((this.dinerobilletero4<0) || (this.dinerobilletero4 > 999999) ){this.dinerobilletero4=0};
                            this.dinerobilletero5=this.salasactual[_i].dinerobilletero5;
                            if ((this.dinerobilletero5<0) || (this.dinerobilletero5 > 999999) ){this.dinerobilletero5=0};


                            this.marcabilletero1=this.salasactual[_i].marcabilletero1;
                            this.marcabilletero2=this.salasactual[_i].marcabilletero2;
                            this.marcabilletero3=this.salasactual[_i].marcabilletero3;
                            this.marcabilletero4=this.salasactual[_i].marcabilletero4;
                            this.marcabilletero5=this.salasactual[_i].marcabilletero5;

                            this.juegobilletero1=this.salasactual[_i].juegobilletero1;
                            this.juegobilletero2=this.salasactual[_i].juegobilletero2;
                            this.juegobilletero3=this.salasactual[_i].juegobilletero3;
                            this.juegobilletero4=this.salasactual[_i].juegobilletero4;
                            this.juegobilletero5=this.salasactual[_i].juegobilletero5;

                            this.hora=this.salasactual[_i].fechahora;

                            this.totalbilleteros=this.salasactual[_i].totalbilleteros;
                            //this.totalbilletero=  `${ parseInt(this.salasactual[_i].dinerobilletero1) + parseInt(this.salasactual[_i].dinerobilletero2) + parseInt(this.salasactual[_i].dinerobilletero3) + parseInt(this.salasactual[_i].dinerobilletero4) + parseInt(this.salasactual[_i].dinerobilletero5)}`;
                          }
                        }
                  }

               })

    }

}

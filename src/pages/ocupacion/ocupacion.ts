import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
//import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from "../../config/url.servicios";

import { MetProvider } from "../../providers/met/met";

@Component({
  selector: 'page-ocupacion',
  templateUrl: 'ocupacion.html',
})
export class OcupacionPage {

  sala:any={};
  salasactual:any[]=[];

  token:string;
  idsocio:string;

  totalmet:string;
  maqfueradelinea:number=0;
  maqnoocupadas:number=0;
  maqocupadas:number=0;
  hora:string="";

  public doughnutChartLabels:string[] = ['Fuera de linea','Ocupadas','No Ocupadas'];
  public doughnutChartData:number[] = [1,1,1];
  public doughnutChartType:string = 'doughnut';


  constructor(  public http: Http,
                public navParams: NavParams,
                private _mp: MetProvider) {


    this.sala= this.navParams.get("sala");


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

                          if (this.salasactual[_i].sala == this.sala.sala ){
                              //console.log(num);
                              this.maqfueradelinea=this.salasactual[_i].maqfueradelinea;
                              this.maqnoocupadas=this.salasactual[_i].maqnoocupadas;
                              this.maqocupadas=this.salasactual[_i].maqocupadas;

                              this.hora=this.salasactual[_i].fechahora;

                              this.doughnutChartData=[this.maqfueradelinea,this.maqocupadas,this.maqnoocupadas];

                              this.totalmet=  `${ parseInt(this.salasactual[_i].maqfueradelinea) + parseInt(this.salasactual[_i].maqnoocupadas) + parseInt(this.salasactual[_i].maqocupadas)}`;
                            }
                          }
                    }

                 })


/*
    console.log(' RootPage Cargar y leer Storage Ocupacion');
    console.log( this.navParams.get("sala"));
    this.sala= this.navParams.get("sala");

    this.hora=this.sala.fechahora;
    this.maqfueradelinea=parseInt(this.sala.maqfueradelinea);
    this.maqnoocupadas=parseInt(this.sala.maqnoocupadas);
    this.maqocupadas=parseInt(this.sala.maqocupadas);

    this.doughnutChartData=[this.maqfueradelinea,this.maqocupadas,this.maqnoocupadas];

    this.totalmet=  `${ parseInt(this.sala.maqfueradelinea) + parseInt(this.sala.maqnoocupadas) + parseInt(this.sala.maqocupadas)}`;
*/

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
                      if (this.salasactual[_i].sala == this.sala.sala ){
                          //console.log(num);
                          this.maqfueradelinea=this.salasactual[_i].maqfueradelinea;
                          this.maqnoocupadas=this.salasactual[_i].maqnoocupadas;
                          this.maqocupadas=this.salasactual[_i].maqocupadas;

                          this.hora=this.salasactual[_i].fechahora;

                          this.doughnutChartData=[this.maqfueradelinea,this.maqocupadas,this.maqnoocupadas];

                          this.totalmet=  `${ parseInt(this.salasactual[_i].maqfueradelinea) + parseInt(this.salasactual[_i].maqnoocupadas) + parseInt(this.salasactual[_i].maqocupadas)}`;
                        }
                      }
                }

             })

  }


}

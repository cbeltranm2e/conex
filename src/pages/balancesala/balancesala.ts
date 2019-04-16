import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
//import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from "../../config/url.servicios";

import { MetProvider } from "../../providers/met/met";


@Component({
  selector: 'page-balancesala',
  templateUrl: 'balancesala.html',
})
export class BalancesalaPage {

  sala:any={};
  salasactual:any[]=[];

  token:string;
  idsocio:string;

  entradas:number=0;
  salidas:number=0;
  salidasg:number=0;
  neto:number=0;
  negativo:string="-";
  hora:string="";

  public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

    //Chart Labels
    public barChartLabels:string[] = ['Entradas', 'Salidas', 'Neto'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    //Chart data
    public barChartData:any[] = [
      { data: [0, 0, 0], label: 'Datos Conexmet'}
    ];

    // Chart events
    public chartClicked(e:any):void {
      console.log(e);
    }

    // Chart events
    public chartHovered(e:any):void {
      console.log(e);
    }

  constructor( public navParams: NavParams,
               private _mp: MetProvider,
               public http: Http) {

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
                                       this.entradas=this.salasactual[_i].metentradas;
                                       this.salidas=this.salasactual[_i].premiosteoricos;
                                       this.neto=this.salasactual[_i].metneto;

                                       this.hora=this.salasactual[_i].fechahora;

                                       this.barChartData=[
                                         { data: [this.entradas, this.salidasg, this.neto], label: 'Datos Conexmet'}
                                       ];

                                     }
                                   }
                             }

                          })

/*
    console.log(' RootPage Cargar y leer Storage Balance Sala');
    console.log( this.navParams.get("sala"));
    this.sala= this.navParams.get("sala");

    this.hora=this.sala.fechahora;

    this.entradas=parseInt(this.sala.metentradas);
    this.salidas=parseInt(this.sala.metsalidas);
    this.neto=parseInt(this.sala.metneto);

    this.barChartData=[
      { data: [this.entradas, this.salidas, this.neto], label: 'Datos Conexmet'}
    ];
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
                      //var num = this.salasactual[_i];
                      if (this.salasactual[_i].sala == this.sala.sala ){
                          //console.log(num);
                          this.entradas=this.salasactual[_i].metentradas;
                          this.salidas=this.salasactual[_i].premiosteoricos;
                          this.neto=this.salasactual[_i].metneto;

                          this.hora=this.salasactual[_i].fechahora;

                          this.barChartData=[
                            { data: [this.entradas, this.salidasg, this.neto], label: 'Datos Conexmet'}
                          ];

                        }
                      }
                }

             })

  }


}

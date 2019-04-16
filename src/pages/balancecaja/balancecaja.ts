import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
//import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';

import { MetProvider } from "../../providers/met/met";

import { URL_SERVICIOS } from "../../config/url.servicios";



@Component({
  selector: 'page-balancecaja',
  templateUrl: 'balancecaja.html',
})
export class BalancecajaPage {

  sala:any={};
  salasactual:any[]=[];

  token:string;
  idsocio:string;

  total:string;
  premiospagados:number=0;
  basesingresadas:number=0;
  dineroencaja:number=0;
  egresos:number=0;
  hora:string="";
  negativo:string="-";

  public barChartOptionsCaja:any = {
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
    public barChartLabelsCaja:string[] = ['Premios', 'Bases', 'Caja','Egresos'];
    public barChartTypeCaja:string = 'bar';
    public barChartLegendCaja:boolean = true;
    public barChartbackgroundColorCaja:string[] =  ["#37A078","#37A078","#37A078","#37A078"];
    public barCharthoverbackgroundColorCaja:string[] =  ["#37A078", "#37A078", "#37A078", "#37A078"];

    //Chart data
    public barChartDataCaja:any[] = [
      { data: [0, 0, 0, 0], label: 'Datos Conexmet'}];


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
                          //var num = this.salasactual[_i];
                          if (this.salasactual[_i].sala == this.sala.sala ){
                              //console.log(num);
                              //this.premiospagados =this.salasactual[_i].premiospagados;
                              //this.basesingresadas=this.salasactual[_i].basesingresadas;
                              if (((this.premiospagados=this.salasactual[_i].premiospagados) < 0) || (this.premiospagados > 9999999)){this.premiospagados=0};
                              if (((this.basesingresadas=this.salasactual[_i].basesingresadas) < 0) || (this.basesingresadas > 9999999)){this.basesingresadas=0};
                              if (((this.dineroencaja=this.salasactual[_i].dineroencaja) < 0) || (this.dineroencaja > 9999999)){this.dineroencaja=0};

                              this.hora=this.salasactual[_i].fechahora;
                              this.egresos=this.salasactual[_i].egresos;

                              this.total=  `${ parseInt(this.salasactual[_i].premiospagados) + parseInt(this.salasactual[_i].basesingresadas) + parseInt(this.salasactual[_i].dineroencaja)}`;

                              this.barChartDataCaja=[
                                { data: [this.premiospagados, this.basesingresadas, this.dineroencaja, this.egresos], label: 'Datos Conexmet'}
                              ];
                            }
                          }
                    }

                 });
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
                                       //this.premiospagados =this.salasactual[_i].premiospagados;
                                       //this.basesingresadas=this.salasactual[_i].basesingresadas;
                                       if (((this.premiospagados=this.salasactual[_i].premiospagados) < 0) || (this.premiospagados > 9999999)){this.premiospagados=0};
                                       if (((this.basesingresadas=this.salasactual[_i].basesingresadas) < 0) || (this.basesingresadas > 9999999)){this.basesingresadas=0};
                                       if (((this.dineroencaja=this.salasactual[_i].dineroencaja) < 0) || (this.dineroencaja > 9999999)){this.dineroencaja=0};

                                       this.hora=this.salasactual[_i].fechahora;
                                       this.egresos=this.salasactual[_i].egresos;

                                       this.total=  `${ parseInt(this.salasactual[_i].premiospagados) + parseInt(this.salasactual[_i].basesingresadas) + parseInt(this.salasactual[_i].dineroencaja)}`;

                                       this.barChartDataCaja=[
                                         { data: [this.premiospagados, this.basesingresadas, this.dineroencaja, this.egresos], label: 'Datos Conexmet'}
                                       ];
                                     }
                                   }
                             }

                          })

               }


}

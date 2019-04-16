import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from "../../config/url.servicios";
//Plugin service
import { Storage } from '@ionic/storage';

import { Platform } from "ionic-angular";

@Injectable()
export class MetProvider {

salas:any[]=[];
salasactual:any[]=[];

token:string;
idsocio:string;



  constructor(public http: Http,
              private platform: Platform,
              private storage: Storage) {
    console.log('Hello MetProvider Provider');
    this.cargar_storage();
    //console.log(this.token);
    //console.log(this.idsocio);
    this.cargar_todos();
    //console.log(this.salas);
  }

  cargar_todos(){


    let url = URL_SERVICIOS + "/conexdata/obtener_data/" + this.token +"/" + this.idsocio;

    this.salas= [];

    console.log('Funcion cargar todos');
    console.log(this.salas);

    this.http.get( url )
             .map( resp => resp.json() )
             .subscribe ( data =>{
               console.log(data);
               if ( data.error){
                 // Aqui error
               }else{
                 this.salas.push( ... data.conexdata);
                 console.log(this.salas);
               }

             })
  }

  cargar_todos_pagina(){

    //let salaactual:string = salaactual;

    let url = URL_SERVICIOS + "/conexdata/obtener_data/" + this.token +"/" + this.idsocio;

    this.salasactual= [];

    console.log('Funcion cargar todos pagina');

    //console.log(this.salaactual);
    //console.log(this.salas);

    this.http.get( url )
             .map( resp => resp.json() )
             .subscribe ( data =>{
               //console.log(data);
               if ( data.error){
                 // Aqui error
               }else{
                 this.salasactual.push( ... data.conexdata);
                 console.log(this.salasactual);
                 console.log(this.salasactual[2]);

               }

             })
  }

  cargar_storage(){
      let promesa= new Promise (( resolve, reject) =>{

        if (this.platform.is("cordova")){
          this.storage.ready()
                      .then ( () => {
                      this.storage.get("token")
                                    .then( token => {
                                      if (token){
                                        this.token=token;
                                      }
                                    } )
                      this.storage.get("idsocio")
                                    .then( idsocio => {
                                      if (idsocio){
                                      this.idsocio=idsocio;
                                      }
                                      resolve();
                                    } )

                      })


        } else{
          //computadora
            if (localStorage.getItem("token")){
            this.token = localStorage.getItem("token");
            this.idsocio = localStorage.getItem("idsocio");
            }
            resolve();
          }
        });
        return promesa;

      }



}

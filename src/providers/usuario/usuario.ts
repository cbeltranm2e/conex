import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from "../../config/url.servicios";

//Plugin service
import { Storage } from '@ionic/storage';

import { AlertController, Platform } from "ionic-angular";


@Injectable()
export class UsuarioProvider {

  token:string;
  idsocio:string;

  constructor(public http: Http,
              private alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage) {
    console.log('Hello UsuarioProvider Provider');
    this.cargar_storage();
  }

  activo():boolean{
    if (this.token){
      return true;
    } else {
      return false;
    }
  }

  ingresar (contrasena:string, idsocio:string){

    let data = new URLSearchParams();

    data.append("idsocio",idsocio);
    data.append("contrasena",contrasena);

    let url= URL_SERVICIOS + "/loginconexmet";

    return this.http.post( url, data )
                    .map( resp=>{

                      let data_resp= resp.json();
                      console.log(data_resp);

                          if (data_resp.error){

                              this.alertCtrl.create({
                                title: "Error al iniciar",
                                subTitle: data_resp.mensaje,
                                buttons:["OK"]
                              }).present();

                          }else{
                            this.token = data_resp.token;
                            this.idsocio =  data_resp.idsocio;


                            //Guardar Storage
                            this.guardar_storage();

                          }
                    return data_resp.error;
                    })
  }

  cerrar_sesion(){

        this.token = null;
        this.idsocio = null;

        //Guardar Storage
        this.guardar_storage();
        console.log('Cerrar');
        window.location.reload();
    }

    private guardar_storage(){
          if( this.platform.is("cordova")){
            //dispositivo
            this.storage.set('token', this.token);
            this.storage.set('idsocio', this.idsocio);
          }else{
            //computadora
            if( this.token){
            localStorage.setItem("token", this.token);
            localStorage.setItem("idsocio", this.idsocio);
            }else{
            localStorage.removeItem("token");
            localStorage.removeItem("idsocio");
            }
        }
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

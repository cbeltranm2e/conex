import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {ChartsModule} from 'ng2-charts';

//Storage
import { IonicStorageModule } from '@ionic/storage';

import { BalancecajaPage,
        BalancesalaPage,
        IngresometPage,
        OcupacionPage,
        RootPage,
        SalaPage,
        LoginPage} from "../pages/index.paginas";
import { MetProvider } from '../providers/met/met';
import { UsuarioProvider } from '../providers/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BalancecajaPage,
    BalancesalaPage,
    IngresometPage,
    OcupacionPage,
    RootPage,
    SalaPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Atras'}),
    IonicStorageModule.forRoot(),
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BalancecajaPage,
    BalancesalaPage,
    IngresometPage,
    OcupacionPage,
    RootPage,
    SalaPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MetProvider,
    UsuarioProvider
  ]
})
export class AppModule {}

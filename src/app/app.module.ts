import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environments';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { SumitresponsePage } from '../pages/sumitresponse/sumitresponse';
import { ViewresponsePage } from '../pages/viewresponse/viewresponse';
import { DeveloperPage } from '../pages/developer/developer';

import { IonicStorageModule } from '@ionic/storage';
import {DatePipe} from '@angular/common';
import { Clipboard } from '@ionic-native/clipboard';
import { FCM } from '@ionic-native/fcm';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AboutPage,
    SumitresponsePage,
    ViewresponsePage,
    DeveloperPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AboutPage,
    ViewresponsePage,
    SumitresponsePage,
    DeveloperPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatePipe,
    Clipboard,
    FCM,
    CallNumber,
    LocalNotifications
  ]
})
export class AppModule {}

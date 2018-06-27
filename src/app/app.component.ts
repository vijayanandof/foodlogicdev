import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public zone:NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.zone = new NgZone({});
    const config = {
      apiKey: 'AIzaSyCNtXbDYVBs--gprMft0Aeep_Ox0X4j2Ic',
      authDomain: 'foodlogic-31e18.firebaseapp.com',
      databaseURL: 'https://foodlogic-31e18.firebaseio.com',
      projectId: 'foodlogic-31e18',
      storageBucket: 'foodlogic-31e18.appspot.com',
      messagingSenderId: '884922975798'
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) { 
          this.rootPage = 'LoginPage';
        } else {
          this.rootPage = TabsPage;
        }
      });     
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


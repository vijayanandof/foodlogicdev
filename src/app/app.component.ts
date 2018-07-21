import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public zone:NgZone;

  constructor(private fcm: FCM,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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
            //Notifications
            this.fcm.subscribeToTopic('all');
            this.fcm.getToken().then(token=>{
                console.log(token);
            })
            this.fcm.onNotification().subscribe(data=>{
              if(data.wasTapped){
                console.log("Received in background");
              } else {
                console.log("Received in foreground");
              };
            })
            this.fcm.onTokenRefresh().subscribe(token=>{
              console.log(token);
            });
            //end notifications.
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


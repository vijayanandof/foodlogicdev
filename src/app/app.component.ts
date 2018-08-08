import { Component, NgZone, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { SumitresponsePage } from '../pages/sumitresponse/sumitresponse';
import { ViewresponsePage } from '../pages/viewresponse/viewresponse';

import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;
  public zone:NgZone;
  pages: Array<{title: string, component: any}>;

  constructor(private fcm: FCM,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.pages = [
      { title: 'Todays Menu', component: HomePage },
      { title: 'Daily Menu', component: AboutPage },
      { title: 'Submit response', component: SumitresponsePage },
      { title: 'View response', component: ViewresponsePage }
    ];

    this.zone = new NgZone({});
    const config = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: ''
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// We import the authentication provider to test the log-out function.
import { AuthProvider } from '../../providers/auth/auth';
import { AboutPage } from '../about/about';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  today:String = "?";
  Wday: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  items: Observable<any[]>;
  breakfast: Observable<any[]>;
  lunch:Observable<any[]>;
  snacks:Observable<any[]>;
  dinner:Observable<any[]>;
  daystatus:String;
  flag:boolean;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider,public db: AngularFireDatabase,private localNotifications: LocalNotifications) {
    
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Save food in one click!',
      every: 'day',
      data: { secret: "Testing" }
    });
    this.daystatus = "Today";
    var day = new Date();
    this.today = this.Wday[day.getDay()];
    this.breakfast = db.list('menu/'+this.today+'/breakfast').valueChanges();
    this.lunch = db.list('menu/'+this.today+'/lunch').valueChanges();
    this.snacks = db.list('menu/'+this.today+'/snacks').valueChanges();
    this.dinner = db.list('menu/'+this.today+'/dinner').valueChanges();
    this.flag=true;
  }

  /**
   * Calls the authentication provider and logs the user out, on successful logout it sends the user
   * back to the login page.
   */
  ionViewDidLoad () {
 /* firebase.database().ref('/menu/'+this.today).on('value', function(snapshot) {
      console.log(snapshot.val());
  });*/
  console.log(this.items);
}
  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot(AboutPage);
    });
  }

  nextdaymenu(){
    if (this.flag){
      var day = new Date();
      var tomorrow;
      if(day.getDay()== 6){
        tomorrow = 0;
      }else{
        tomorrow= day.getDay()+1;
      }
      this.daystatus = "Tomorrow";
      this.today = this.Wday[tomorrow];
      this.breakfast = this.db.list('menu/'+this.today+'/breakfast').valueChanges();
      this.lunch = this.db.list('menu/'+this.today+'/lunch').valueChanges();
      this.snacks = this.db.list('menu/'+this.today+'/snacks').valueChanges();
      this.dinner = this.db.list('menu/'+this.today+'/dinner').valueChanges();
      this.flag=false;
    }else{
      day = new Date();
      this.daystatus = "Today";
      this.today = this.Wday[day.getDay()];
      this.breakfast = this.db.list('menu/'+this.today+'/breakfast').valueChanges();
      this.lunch = this.db.list('menu/'+this.today+'/lunch').valueChanges();
      this.snacks = this.db.list('menu/'+this.today+'/snacks').valueChanges();
      this.dinner = this.db.list('menu/'+this.today+'/dinner').valueChanges();
      this.flag=true;
    }

  }

}

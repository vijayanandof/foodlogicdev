import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// We import the authentication provider to test the log-out function.
import { AuthProvider } from '../../providers/auth/auth';
import { AboutPage } from '../about/about';

import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
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
  dinner:Observable<any[]>;
  
  constructor(public navCtrl: NavController, public authProvider: AuthProvider,public db: AngularFireDatabase) {
    var day = new Date();
    this.today = this.Wday[day.getDay()];
    this.breakfast = db.list('menu/'+this.today+'/breakfast').valueChanges();
    this.lunch = db.list('menu/'+this.today+'/lunch').valueChanges();
    this.dinner = db.list('menu/'+this.today+'/dinner').valueChanges();
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

}

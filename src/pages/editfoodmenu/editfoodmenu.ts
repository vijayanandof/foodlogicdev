import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
/**
 * Generated class for the EditfoodmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editfoodmenu',
  templateUrl: 'editfoodmenu.html',
})
export class EditfoodmenuPage {
  users: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,public db: AngularFireDatabase) {

    this.users = this.db.list('userProfile').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditfoodmenuPage');
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
    });
  }
}

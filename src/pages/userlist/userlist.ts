import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
/**
 * Generated class for the UserlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {
  users: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
  
    this.users = this.db.list('userProfile').valueChanges();
    console.log(this.users);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserlistPage');
  }

}

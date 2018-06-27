import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  monday: Observable<any[]>;
  tuesday: Observable<any[]>;
  wednesday: Observable<any[]>;
  thursday: Observable<any[]>;
  friday: Observable<any[]>;
  saturday: Observable<any[]>;
  sunday: Observable<any[]>;
  constructor(public navCtrl: NavController,public db: AngularFireDatabase) {
    this.monday = db.list('menu/'+'Monday').valueChanges();
    this.tuesday = db.list('menu/'+'Tuesday').valueChanges();
    this.wednesday = db.list('menu/'+'Wednesday').valueChanges();
    this.thursday = db.list('menu/'+'Thursday').valueChanges();
    this.friday = db.list('menu/'+'Friday').valueChanges();
    this.saturday = db.list('menu/'+'Saturday').valueChanges();
    this.sunday = db.list('menu/'+'Sunday').valueChanges();
    console.log(this.items)
  }

}

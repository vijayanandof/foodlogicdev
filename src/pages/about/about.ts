import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  day :String;
  breakfast: Observable<any[]>;
  lunch:Observable<any[]>;
  snacks:Observable<any[]>;
  dinner:Observable<any[]>;
  flag:boolean;
  constructor(public navCtrl: NavController,public db: AngularFireDatabase) {
    this.flag = false;
  }
  
  onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue);
    this.flag= true;
    this.breakfast = this.db.list('menu/'+selectedValue+'/breakfast').valueChanges();
    this.lunch = this.db.list('menu/'+selectedValue+'/lunch').valueChanges();
    this.snacks = this.db.list('menu/'+selectedValue+'/snacks').valueChanges();
    this.dinner = this.db.list('menu/'+selectedValue+'/dinn er').valueChanges();
  }
}

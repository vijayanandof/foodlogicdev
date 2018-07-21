import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Clipboard } from '@ionic-native/clipboard';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { DeveloperPage } from '../developer/developer';
/**
 * Generated class for the ViewresponsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewresponse',
  templateUrl: 'viewresponse.html',
})
export class ViewresponsePage {
  responseDate;
  dataAccess: AngularFireDatabase;
  breakfast:any;
  lunch:any;
  dinner:any;
  snack:any;
  constructor(private callNumber: CallNumber,private alertCtrl: AlertController,private clipboard: Clipboard,public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
    this.dataAccess = db;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewresponsePage');
  }

  updateResponseListing()
  {

    this.dataAccess.object('DailyLog/'+this.responseDate+'/Breakfast').valueChanges().subscribe(x => this.breakfast=x);
    this.dataAccess.object('DailyLog/'+this.responseDate+'/Lunch').valueChanges().subscribe(x => this.lunch=x);
    this.dataAccess.object('DailyLog/'+this.responseDate+'/Dinner').valueChanges().subscribe(x => this.dinner=x);
    this.dataAccess.object('DailyLog/'+this.responseDate+'/Snack').valueChanges().subscribe(x => this.snack=x);

    if(this.breakfast!=undefined && this.lunch!=undefined && this.dinner!=undefined && this.snack!=undefined){
      let alert = this.alertCtrl.create({
        title: 'Not data found for this date!',
        subTitle: "Try another!",
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  copyResponseListing()
  {
    this.dataAccess.object('DailyLog/'+this.responseDate+'/Breakfast').valueChanges().subscribe(x => this.breakfast=x);
    this.dataAccess.object('DailyLog/'+this.responseDate+'/Lunch').valueChanges().subscribe(x => this.lunch=x);
    this.dataAccess.object('DailyLog/'+this.responseDate+'/Dinner').valueChanges().subscribe(x => this.dinner=x);
    this.dataAccess.object('DailyLog/'+this.responseDate+'/Snack').valueChanges().subscribe(x => this.snack=x);
    this.clipboard.copy("Breakfast Responses:"+this.breakfast+"\n"+"Lunch Responses:"+this.lunch+"\n"+"Dinner Responses:"+this.dinner+"\n"+"Snack Responses:"+this.snack);
    if(this.breakfast==undefined){
      let alert = this.alertCtrl.create({
        title: 'Please,Click Again!',
        subTitle: "Fetching and Syncing!",
        buttons: ['Dismiss']
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: 'Data Copied!',
        subTitle: "Breakfast Responses:"+this.breakfast+"\n"+"Lunch Responses:"+this.lunch+"\n"+"Dinner Responses:"+this.dinner,
        buttons: ['Dismiss']
      });
      alert.present();
    }
    }

    call(){
      let alert = this.alertCtrl.create({
        title: 'Do you really want to call Mr.Guna Sekaran?',
        message: 'Call and inform when you cant update or for bulk response to prepare food!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes, Call',
            handler: () => {
              console.log('Call clicked');
              this.callNumber.callNumber("8270375476", true)
                .then(res => console.log('Launched dialer!', res))
                .catch(err => console.log('Error launching dialer', err));
            }
          }
        ]
      });
      alert.present();
    }
    developer(){
      this.navCtrl.push(DeveloperPage);

    }
}

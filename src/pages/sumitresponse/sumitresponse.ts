import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SumitresponsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sumitresponse',
  templateUrl: 'sumitresponse.html',
})
export class SumitresponsePage {

  breakfastResponses : any;
  lunchResponses : any;
  dinnerResponses : any;
  dataAccess: AngularFireDatabase;
  currentDate: String;
  datePipe: DatePipe;
  breakfast: Boolean;
  lunch: Boolean;
  dinner: Boolean;
  responseSubmitted: Boolean;

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase,public dP: DatePipe,private storage: Storage) {
    this.dataAccess = db;
    this.datePipe = dP;
    var date = new Date(new Date().getTime()+(1*24*60*60*1000));
    
    this.currentDate = this.datePipe.transform(date,"yyyy-MM-dd");
    this.responseSubmitted = true;
    this.storage.get("LastSubmittedDate").then((date)=>{
      if (date == this.currentDate)
      {
        console.log("Here in the dark thou have already submitted");
        this.responseSubmitted = false;    
      }
      else{
        this.dataAccess.object('DailyLog/'+this.currentDate+'/Breakfast').valueChanges().subscribe((response:any)=>{
         this.breakfastResponses = response;
         } );
        this.dataAccess.object('DailyLog/'+this.currentDate+'/Lunch').valueChanges().subscribe((response:any)=>{
          this.lunchResponses = response;
        } );
        this.dataAccess.object('DailyLog/'+this.currentDate+'/Dinner').valueChanges().subscribe((response:any)=>{
          this.dinnerResponses = response;
        } );
      }
    },); 
        
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SumitresponsePage');
  }

  submitResponses() {
    this.dataAccess.object('DailyLog/'+this.currentDate).update( {
      Dinner : (this.dinner == true) ? ++this.dinnerResponses:this.dinnerResponses , 
      Breakfast : (this.breakfast == true) ? ++this.breakfastResponses:this.breakfastResponses , 
      Lunch : (this.lunch == true) ? ++this.lunchResponses:this.lunchResponses });
      this.storage.set("LastSubmittedDate",this.currentDate);
      this.responseSubmitted = false;

      let alert = this.alertCtrl.create({
        title: 'Submitted!',
        subTitle: 'Data Submitted and synced!',
        buttons: ['Dismiss']
      });
      alert.present();
  }



}

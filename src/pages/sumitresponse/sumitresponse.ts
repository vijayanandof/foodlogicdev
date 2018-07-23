import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
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
  snackResponses: any;
  dataAccess: AngularFireDatabase;
  currentDate: String;
  datePipe: DatePipe;
  breakfast: Boolean;
  lunch: Boolean;
  dinner: Boolean;
  snack: Boolean;
  feedback: String;
  responseSubmitted: Boolean;
  feedbackSubmitted: Boolean;
  userProfile:any;

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase,public dP: DatePipe,private storage: Storage,public authProvider: AuthProvider) {
    this.dataAccess = db;
    this.datePipe = dP;
    var date = new Date(new Date().getTime()+(1*24*60*60*1000));
    this.userProfile = this.storage.get("email");
    this.currentDate = this.datePipe.transform(date,"yyyy-MM-dd");
    this.responseSubmitted = true;
    this.feedbackSubmitted = true;
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
       this.dataAccess.object('DailyLog/'+this.currentDate+'/Snack').valueChanges().subscribe((response:any)=>{
         this.snackResponses = response;
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
      Snack : (this.snack == true) ? ++this.snackResponses:this.snackResponses,
      Lunch : (this.lunch == true) ? ++this.lunchResponses:this.lunchResponses });
      this.storage.set("LastSubmittedDate",this.currentDate);
      this.responseSubmitted = false;
      let alert = this.alertCtrl.create({
        title: 'Submitted!',
        subTitle: 'Response Submitted and synced!',
        buttons: ['Dismiss']
      });
      alert.present();
  }

  submitFeedback(){
    let feedback = this.feedback;

    var date = new Date(new Date().getTime());
    var currentDate = this.datePipe.transform(date,"yyyy-MM-dd");
    let userName = this.userProfile.__zone_symbol__value.slice(0,this.userProfile.__zone_symbol__value.indexOf('@'));
    let data = {};
    data[userName] = feedback;
    this.dataAccess.object('DailyFeedback/'+currentDate).update(data);
    this.feedbackSubmitted = false;
    let alert = this.alertCtrl.create({
      title: 'Submitted!',
      subTitle: 'Feedback Submitted and synced!',
      buttons: ['Dismiss']
    });
    alert.present();
  }



}

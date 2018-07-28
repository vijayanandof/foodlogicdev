import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  day :String;
  breakfast: Observable<any[]>;
  lunch:Observable<any[]>;
  snacks:Observable<any[]>;
  dinner:Observable<any[]>;
  breakfastRef: any;
  lunchRef: any;
  dinnerRef: any;
  snacksRef: any;
  flag:boolean;
  currentSelectedDay: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,public db: AngularFireDatabase,public alertCtrl: AlertController) {
    this.users = this.db.list('userProfile').valueChanges();   
  }

  ionViewDidLoad() {
    console.log('CD ionViewDidLoad EditfoodmenuPage');
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
    });
  }
  
  onSelectChange(selectedValue: any) {
    this.currentSelectedDay = selectedValue;
    this.flag= true;
    this.breakfast = this.db.list('TestMenu/'+selectedValue+'/breakfast').valueChanges();
    this.breakfast.subscribe((items)=>{this.breakfastRef = items});
    this.lunch = this.db.list('TestMenu/'+selectedValue+'/lunch').valueChanges();
    this.lunch.subscribe((items)=>{this.lunchRef = items});
    this.snacks = this.db.list('TestMenu/'+selectedValue+'/snacks').valueChanges();
    this.snacks.subscribe((items)=>{this.snacksRef = items});
    this.dinner = this.db.list('TestMenu/'+selectedValue+'/dinner').valueChanges();
    this.dinner.subscribe((items)=>{this.dinnerRef = items});
  }

  editItem(item,index,category){
    index = `item${index+1}`;
    let dataRef = this.db.list(`TestMenu/${this.currentSelectedDay}/`);
    let prompt = this.alertCtrl.create({
      title: 'Edit the menu item',
      inputs: [{
          value: item
      }],
      buttons: [
          {
              text: 'Cancel'
          },
          {
              text: 'Save',
              handler: data => {
                  let payload = {};
                  payload[index] = data[0];
                  dataRef.update(category,payload);
              }
          }
      ]
  });
  prompt.present(); 
}

deleteItem(item,index,category){
  index = `item${index+1}`;
  let dataRef = this.db.list(`TestMenu/${this.currentSelectedDay}${category}`);
  let prompt = this.alertCtrl.create({
    title: 'Delete the menu item',
    inputs: [{
        value: item
    }],
    buttons: [
        {
            text: 'Cancel'
        },
        {
            text: 'Delete',
            handler: data => {
                dataRef.remove(index);
            }
        }
    ]
});
prompt.present(); 
}

  addItem(category){
    let dataRef = this.db.list(`TestMenu/${this.currentSelectedDay}`);
    let updateRef;
    if (category === '/breakfast'){
      updateRef = this.breakfastRef;
    }
    else if(category === '/lunch'){
      updateRef = this.lunchRef;
    }
    
    else if(category === '/dinner'){
      updateRef = this.dinnerRef;
    }
    
    else if(category === '/snacks'){
      updateRef = this.snacksRef;
    }
    else{

    }
    let prompt = this.alertCtrl.create({
      title: 'Add a new menu item',
      inputs: [{
          value: ''
      }],
      buttons: [
          {
              text: 'Cancel'
          },
          {
              text: 'Add',
              handler: data => {
                let payload = {};
                payload[`item${updateRef.length+1}`] = data[0];
                dataRef.update(category,payload);
              }
          }
      ]
  });
  prompt.present();
}
}

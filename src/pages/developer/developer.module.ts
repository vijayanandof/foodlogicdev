import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeveloperPage } from './developer';

@NgModule({
  declarations: [
    DeveloperPage,
  ],
  imports: [
    IonicPageModule.forChild(DeveloperPage),
  ],
})
export class DeveloperPageModule {}

import { Component } from '@angular/core';

import { ChartreviewPage } from '../chartreview/chartreview';
import { EditfoodmenuPage } from '../editfoodmenu/editfoodmenu';
import { UserlistPage } from '../userlist/userlist';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EditfoodmenuPage;
  tab2Root = ChartreviewPage;
  tab3Root = UserlistPage;

  constructor() {

  }
}

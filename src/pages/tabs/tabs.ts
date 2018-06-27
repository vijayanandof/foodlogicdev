import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';

import { SumitresponsePage } from '../sumitresponse/sumitresponse';
import { ViewresponsePage } from '../viewresponse/viewresponse';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = SumitresponsePage;
  tab4Root = ViewresponsePage;
  constructor() {

  }
}

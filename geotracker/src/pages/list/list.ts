import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/location/location';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  locations;

  constructor(public navCtrl: NavController, public navParams: NavParams,public firebaseService: FirebaseService) {
  }

  ionViewDidLoad() {
    this.loadLocations();
  }

  loadLocations(){
    this.locations  = this.firebaseService.getLocations();
  }

}

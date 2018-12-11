import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/location/location';

import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locations;

  latitude = ''; //set the initial value for latitude
  longitude = ''; //set the initial value for longitude
  intervalInMinutes = 5; // Interval in minutes
  intervalInMiliSeconds = 1000  * this.intervalInMinutes;
  timer;
  
  constructor(public navCtrl: NavController,private platform: Platform, private backgroundGeolocation: BackgroundGeolocation, public toastCtrl: ToastController, public firebaseService: FirebaseService) {
    
    // this.platform.ready().then(() => {
    //   const config: BackgroundGeolocationConfig = {
    //           desiredAccuracy: 10,
    //           stationaryRadius: 20,
    //           distanceFilter: 30,
    //           debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    //           stopOnTerminate: true, // enable this to clear background location settings when the app terminates
    //   };
    //   this.backgroundGeolocation.configure(config)
    //     .subscribe((location: BackgroundGeolocationResponse) => {
    //       console.log(location); // For debugging
    //       this.latitude = location.coords.latitude.toString(); //set the latitude
    //       this.longitude = location.coords.longitude.toString(); //set the longitude

    //       this.backgroundGeolocation.finish(); // FOR IOS ONLY
    //     });
    // });
    this.timer = setInterval(() => {
      console.log('Interval');
      this.getLocation();
    }, this.intervalInMiliSeconds);
  }

  ionViewDidLoad() {
    this.loadLocations();
  }

  loadLocations(){
    this.locations  = this.firebaseService.getLocations();
  }

  //Interval timer to keep calling getLocation method
  

  //During development. I use this mock to generate a random long & lat to avoid keep going to Android Studio. Because simulation takes a long time. 
  //For production I will remove the mock function.
  mockGeoLocation(){
    this.latitude = (Math.floor(Math.random()*10000)+1).toString();
    this.longitude = (Math.floor(Math.random()*10000)+1).toString();
    console.log('latitude:'+this.latitude);
    console.log('longitude:'+this.longitude);
  }

  getLocation(){  
    //this.backgroundGeolocation.start();  // start recording location
    //this.backgroundGeolocation.stop(); // If you wish to turn OFF background-tracking, call the #stop method.
    this.mockGeoLocation();
    console.log('From DB:');
    this.firebaseService.addLocation({
        userId: 1,
        latitude: this.latitude,
        longitude: this.longitude,
        datetime: new Date()
    });
    console.log(this.firebaseService.getLocations());
    //Send the location to the database

  }

}

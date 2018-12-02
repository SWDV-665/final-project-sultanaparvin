import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  latitude = ''; //set the initial value for latitude
  longitude = ''; //set the initial value for longitude
  timer;
  intervalInMinutes = 5; // Interval in minutes
  intervalInMiliSeconds = 1000 * 60 * this.intervalInMinutes;

  constructor(public navCtrl: NavController,private platform: Platform, private backgroundGeolocation: BackgroundGeolocation, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      const config: BackgroundGeolocationConfig = {
              desiredAccuracy: 10,
              stationaryRadius: 20,
              distanceFilter: 30,
              debug: true, //  enable this hear sounds for background-geolocation life-cycle.
              stopOnTerminate: true, // enable this to clear background location settings when the app terminates
      };
      this.backgroundGeolocation.configure(config)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location); // For debugging
          this.latitude = location.coords.latitude.toString(); //set the latitude
          this.longitude = location.coords.longitude.toString(); //set the longitude

          this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });

      //Interval timer to keep calling getLocation method
      this.timer = setInterval(() => {
        this.getLocation();
      }, this.intervalInMiliSeconds);

    });
  }
  
  getLocation(){   
    this.backgroundGeolocation.start();  // start recording location
    this.backgroundGeolocation.stop(); // If you wish to turn OFF background-tracking, call the #stop method.
    //Send the location to the database
  }

}

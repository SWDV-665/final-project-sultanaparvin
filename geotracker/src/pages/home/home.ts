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

  constructor(public navCtrl: NavController,private platform: Platform, private backgroundGeolocation: BackgroundGeolocation, public toastCtrl: ToastController) {
    platform.ready().then(() => {

      // // get current position
      // geolocation.getCurrentPosition().then(pos => {
      //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      // });

      // const watch = geolocation.watchPosition().subscribe(pos => {
      //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      // });

      // // to stop watching
      // watch.unsubscribe();
      const config: BackgroundGeolocationConfig = {
              desiredAccuracy: 10,
              stationaryRadius: 20,
              distanceFilter: 30,
              debug: true, //  enable this hear sounds for background-geolocation life-cycle.
              stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };
      this.backgroundGeolocation.configure(config)
        .subscribe((location: BackgroundGeolocationResponse) => {

          console.log(location);
          const toast = this.toastCtrl.create({
            message: location.coords.latitude.toString() ,
            duration: 3000
          });
          toast.present();

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.finish(); // FOR IOS ONLY

        });

      // start recording location
      this.backgroundGeolocation.start();

      // If you wish to turn OFF background-tracking, call the #stop method.
      this.backgroundGeolocation.stop();
    });
  }

}

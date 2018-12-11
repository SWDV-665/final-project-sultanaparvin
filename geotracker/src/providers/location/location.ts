import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Location {
    userId: Number;
    latitude: string;
    longitude: string;
    datetime: string;
}

@Injectable()
export class FirebaseService {
    locations: Observable<any[]>;

    constructor(public afs: AngularFirestore){
        this.locations = afs.collection('locations').valueChanges();
    }

    

    addLocation(value){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/locations').add({
            userId: value.userId,
            latitude: value.latitude,
            longitude: value.longitude,
            datetime: value.datetime
        })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
      })
    }

    getLocations(){
        return this.locations;
    }

}
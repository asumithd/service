import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private LocationSidebarDisplay = new Subject<any>();
  LocationObserver = this.LocationSidebarDisplay.asObservable();

  private currentLocation = new Subject<any>();
  currentLocationObserver = this.currentLocation.asObservable();

  constructor() { }


  displayLocationsidebar(status , data) { 
    this.LocationSidebarDisplay.next({status , data});
  }

  setLocation(location) {
    this.currentLocation.next(location);
  }






}

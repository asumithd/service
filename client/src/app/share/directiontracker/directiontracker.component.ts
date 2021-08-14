import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SocketService } from './../../providers';

declare var google;
@Component({
  selector: 'app-directiontracker',
  templateUrl: './directiontracker.component.html',
  styleUrls: ['./directiontracker.component.scss']
})
export class DirectiontrackerComponent implements OnInit, OnDestroy {

  currentLat: any;
  currentLong: any;
  directionsDisplay: any;
  directionsService: any;
  watchposition: any;
  @Input() destination: any;
  @Input() driver: any;


  // need to remove 
  _docSub: any;
  currentDoc: any;
  documents: any;
  constructor(private documentService: SocketService) { }

  ngOnInit() {
    console.log(this.destination.coords);
    this.documentService.newDriver(this.driver);
    this.documentService.getDocument(this.driver);
    this.documents = this.documentService.documents;
    this._docSub = this.documentService.currentDocument.subscribe(doc => {
      console.log(doc)
      this.currentDoc = doc.id;
      
    });

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  } 

  setPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    this.initMap();
  }


  initMap() {
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsService = new google.maps.DirectionsService;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: { lat: this.currentLat, lng: this.currentLong }
    });
    this.directionsDisplay.setMap(map);
    this.trackChanges();
  }


  // Setting Live Tracking

  trackChanges() {
    if (window.navigator.geolocation) {
      this.watchposition = window.navigator.geolocation.watchPosition(this.setLivePosition.bind(this));
    }


    let cord = [
      { lat: 13.022209, lng: 80.206425 },
      { lat: 13.021603, lng: 80.206383 },
      { lat: 13.020584, lng: 80.206404 },
      { lat: 13.019402, lng: 80.206329 },
      { lat: 13.018111, lng: 80.205868 },
      { lat: 13.017270, lng: 80.205567 },
      { lat: 13.016632, lng: 80.205304 },
      { lat: 13.016042, lng: 80.205079 },
      { lat: 13.015373, lng: 80.204859 },
      { lat: 13.014134, lng: 80.204408 },
      { lat: 13.013036, lng: 80.203947 },
      { lat: 13.012095, lng: 80.203754 },
      { lat: 13.010831, lng: 80.203593 },
      { lat: 13.009440, lng: 80.203598 },
      { lat: 13.008217, lng: 80.203679 },
    ]
    var count = 0;
    setInterval(() => {
      count += 1;
      console.log(cord[count])
      this.testPosition(cord[count]);
      this.sendlivedata(cord[count]);
    }, 5000);
  }

  testPosition(cord) {
    this.currentLat = cord.lat;
    this.currentLong = cord.lng;
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  }

  setLivePosition(position) {
    // console.log(position.coords.longitude)
    // this.currentLat = position.coords.latitude;
    // this.currentLong = position.coords.longitude;
    this.currentLat = 13.022209;
    this.currentLong = 80.206425;
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  } 

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: { lat: this.currentLat, lng: this.currentLong },
      destination: { lat: this.destination.coords[0], lng: this.destination.coords[1] },
      // destination: { lat: 13.008217, lng: 80.203679 },

      travelMode: google.maps.TravelMode['DRIVING']
    }, function (response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }); 
  }

  sendlivedata(data) { 
    data.id = this.driver;
    this.documentService.editDocument(data);
  }
 

  ngOnDestroy() {
    navigator.geolocation.clearWatch(this.watchposition);
  }
}

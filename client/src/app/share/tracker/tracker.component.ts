import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SocketService } from '../../providers';
import { startWith } from 'rxjs/operators';
declare var google;
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class trackerComponent implements OnInit, OnDestroy {

  currentLat: any;
  currentLong: any;
  directionsDisplay: any;
  directionsService: any; 
  @Input() destination: any;
  @Input() driver: any;


  // need to remove   

  document: any = {
    lat: 13.022209,
    lng: 80.206425
  };
  constructor(private documentService: SocketService) { }



  ngOnInit() { 
    // need to update with restaurant location
    this.currentLat = 13.022209;
    this.currentLong = 80.206425;

    this.initMap();
    this.loadDoc();

    this.documentService.getDocument(this.driver);
    this.documentService.currentDocument.subscribe(document => { 
      if (document) {
        this.document = document;
        this.trackChanges();
      }
    });
  }

 
  loadDoc() {
    this.documentService.getDocument(this.driver);
  }
 

  initMap() {
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsService = new google.maps.DirectionsService;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: { lat: this.currentLat, lng: this.currentLong }
    });
    this.directionsDisplay.setMap(map);
  }

 

  trackChanges() {
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  }
 

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    console.log('in2', this.currentLat)
    directionsService.route({
      origin: { lat: this.currentLat, lng: this.currentLong },
      destination: { lat: this.destination.coords[0], lng: this.destination.coords[1] },
      travelMode: google.maps.TravelMode['DRIVING']
    }, function (response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else { 
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
 

  ngOnDestroy() {
    
  }
}

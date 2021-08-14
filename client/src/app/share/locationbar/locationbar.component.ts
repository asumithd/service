import { Component, OnInit, Input } from '@angular/core';
import { LocationService, ShareService, AuthenticationService } from './../../providers';
declare var google: any;
import { constants } from './../../constants';

@Component({
  selector: 'app-locationbar',
  templateUrl: './locationbar.component.html',
  styleUrls: ['./locationbar.component.scss']
})
export class LocationbarComponent implements OnInit {
  addressview: boolean = true;
  mapview: boolean = false;
  location: any = {
    addresstitle: null
  };
  options: any = null;
  overlays: any[];
  locationtileOption: any;
  selectedLocationOption: String = null;
  user: any;
  googleplaceOption: any;
  @Input() editData: any;
  constructor(
    private locationService: LocationService,
    private auth: AuthenticationService,
    private shareService: ShareService) { }

  ngOnInit() {
    this.getUserid();
    this.googleplaceOption = {
      types: [],
      // componentRestrictions: { country: 'UA' }
    }

    if (this.editData) {
      this.location = this.editData;
      this.selectedLocationOption = this.editData.addresstitle;
      this.options = {
        center: { lat: this.location.coords[0], lng: this.location.coords[1] },
        zoom: 12
      };
      this.mapview = true;
      this.addressview = false;
      this.initOverlays();
      this.geocodeLatLng();
    }
    // this.location.addresstitle  = 'HOME';


    this.shareService.getData(constants.getAddress + 'findAvailablelocationSlotByUser/' + this.user._id).subscribe((res) => {
    
      this.locationtileOption = res['data'];
    }, (err) => {
      console.error(err);
    });


  }

  getUserid() {
    this.user = this.auth.getUser('customer');
    if (this.user) {
      this.location.userid = this.user._id;
    }

  }

  getGpsLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    }
  }
  showPosition(position) {
    this.location.coords = [position.coords.latitude, position.coords.longitude]
    // init map
    this.options = {
      center: { lat: this.location.coords[0], lng: this.location.coords[1] },
      zoom: 12
    };
    this.mapview = true;
    this.addressview = false;
    this.initOverlays();
    this.geocodeLatLng();
  }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [new google.maps.Marker({ position: { lat: this.location.coords[0], lng: this.location.coords[1] }, draggable: true, title: "" })];
    }
  }



  handleDragEnd(event) {
    this.location.coords[0] = event.originalEvent.latLng.lat();
    this.location.coords[1] = event.originalEvent.latLng.lng();
    this.geocodeLatLng();
  }

  inputAddress(ev) {
    this.location.coords = [ev.geometry.location.lat(), ev.geometry.location.lng()];
    this.options = {
      center: { lat: this.location.coords[0], lng: this.location.coords[1] },
      zoom: 12
    };
    this.mapview = true;
    this.addressview = false;
    this.initOverlays();
    this.geocodeLatLng();
  }
  geocodeLatLng() {
    var that = this;
    var geocoder = new google.maps.Geocoder;
    const latlng = { lat: parseFloat(this.location.coords[0]), lng: parseFloat(this.location.coords[1]) };
    this.location.fulladdress = [];
    geocoder.geocode({ 'location': latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          const adressArea = results[0].address_components;
          for (let i = 0; i < adressArea.length; i++) {
            if (adressArea[i].types.includes('postal_code')) {
              that.location.postal_code = adressArea[i].long_name;
              that.location.fulladdress.push(adressArea[i].long_name);
            }
            if (adressArea[i].types.includes('country')) {
              that.location.country = adressArea[i].long_name;
              that.location.fulladdress.push(adressArea[i].long_name);
            }
            if (adressArea[i].types.includes('administrative_area_level_1')) {
              that.location.state = adressArea[i].long_name;
              that.location.fulladdress.push(adressArea[i].long_name);

            }
            if (adressArea[i].types.includes('administrative_area_level_2')) {
              that.location.city = adressArea[i].long_name;
              that.location.fulladdress.push(adressArea[i].long_name);
            }
            if (adressArea[i].types.includes('street_number')) {
              that.location.street_number = adressArea[i].long_name;
              that.location.fulladdress.push(adressArea[i].long_name);
            }
            if (adressArea[i].types.includes('route')) {
              that.location.street = adressArea[i].long_name;
              that.location.fulladdress.push(adressArea[i].long_name);
            }
          }
          that.location.fulladdress = that.location.fulladdress.join(', ');
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

  }


  setLocationTitle(ev) {
    this.selectedLocationOption = ev;
    this.selectedLocationOption == 'OTHER' ? this.location.addresstitle = null : this.location.addresstitle = this.selectedLocationOption;
  }



  closeLocation() {
    this.locationService.displayLocationsidebar(false, null)
  }
  savedaddress() {
    if (this.editData) {
      this.shareService.update(constants.getAddress + this.editData._id, this.location).subscribe((data) => {
      }, (err) => {
        console.error(err);
      });
    } else {
      this.locationService.setLocation(this.location);
      this.shareService.postData(constants.getAddress, this.location).subscribe((data) => {
      }, (err) => {
        console.error(err);
      });
    }

    this.closeLocation();
  }
}

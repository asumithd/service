import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { constants } from './../../../app/constants';
import { CartService } from '../../providers';
@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit, OnChanges {

  @Input() dish: any;
  @Input() count: any;

  imagePath: string;
  countervalue: any;
  addedtocart: Boolean;
  products: any = {};
  availtocart: Boolean;
  customizableModal: Boolean;
  item: any;


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.imagePath = constants.carImage;
    if (this.cartService.getcount(this.dish)) {
      this.count = this.cartService.getcount(this.dish).count;
    }

  }

  addtocart(item) {
    this.cartService.saveToCart(item);
    // this.addedtocart = true;
  }

  // removefromcart(item) {
  //   this.cartService.removefromCart(item);
  //   // this.addedtocart = false;
  // }

  addcounter(item) {
    this.item = item;
    if (item.variations.length > 0) {
      this.customizableModal = true;
    } else {
      this.addtocart(item);
      this.availtocart = true;
    }
  }

  addcustomize({ value }) {
    this.item.selectedattributes = value;
    var totalprice = 0; 

    for (var key in value) {
      if (value.hasOwnProperty(key) && value[key]) {
        value[key].forEach(element => {
          let single = element.split('#');
          totalprice = totalprice + parseInt(single[0]);
        });
      }
    };
    this.item.updatedprice = this.item.price + totalprice; 
    this.addtocart(this.item);
    this.availtocart = true;
    this.customizableModal = false; 
  }

  ngOnChanges(changes) {
  }



}

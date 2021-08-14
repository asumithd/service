import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { CartService, ShareService } from '../../providers';

@Component({
  selector: 'app-productcounter',
  templateUrl: './productcounter.component.html',
  styleUrls: ['./productcounter.component.scss']
})
export class ProductcounterComponent implements OnInit, OnChanges {

  constructor(private cartService: CartService) { }

  counterValue = 1;
  @Output() counterChange = new EventEmitter();
  @Input() item: any;
  @Input() count: any;
  addoption: boolean;
  customizableModal: boolean;
  products: any = {};


  @Input()
  get counter() {
    return this.counterValue;
  }

  set counter(val) {
    this.counterValue = val;
  }

  decrement() {
    if (this.counter > 0) {
      this.counterValue = this.counter - 1;
      this.counterChange.emit(this.counterValue);
      this.cartService.changeCount(this.counterValue, this.item._id)
    }
  }

  increment() {
    this.counterValue = this.counter + 1;
    this.counterChange.emit(this.counterValue);
    this.cartService.changeCount(this.counterValue, this.item._id)


    // to chose or repeat funtionality
    // if (this.item.selectedattributes) {
    //   this.addoption = true;
    // } else {
    //   this.counterValue = this.counter + 1;
    //   this.counterChange.emit(this.counterValue);
    //   this.cartService.changeCount(this.counterValue, this.item._id)
    // }
  }

  btntype(type) {
    if (type == 'repeat') {
      this.counterValue = this.counter + 1;
      this.counterChange.emit(this.counterValue);
      this.cartService.changeCount(this.counterValue, this.item._id);
      this.addoption = false;
    } else {
      this.customizableModal = true;
    }
  }

  ngOnInit() {


    // this.cartService.saveToCart(this.item)
  }

  ngOnChanges(changes) {
    if (changes.count) {
      this.counterValue = changes.count.currentValue;
      this.counterChange.emit(this.counterValue);
      this.cartService.changeCount(this.counterValue, this.item._id)
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
    this.cartService.saveToCart(this.item);
    this.customizableModal = false;
    this.addoption = false;

  }

}

import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable , Inject} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ifError } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new Subject<any[]>();
  private singleProdCount = new Subject<any[]>();

  private singleProdCountval = new Subject<any>();

  $singleProdCountval =  this.singleProdCountval.asObservable();
  private itemArray: any = [];

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, ) {
    JSON.parse(localStorage.getItem('cart-item')) ? this.itemArray = JSON.parse(localStorage.getItem('cart-item')) : this.itemArray = []
  }

  saveToCart(item) {  
    if (this.checkitemexits(item) !== -1) { 
      this.itemArray[this.checkitemexits(item)].count++;
    } else { 
      item.count = 1;
      this.itemArray = [...this.itemArray, item];
    }
    this.localStorage.setItem('cart-item', JSON.stringify(this.itemArray));
    this.cartItems.next(this.itemArray);
  }

  removefromCart(item) {
    this.itemArray = this.itemArray.filter(function (obj) {
      return obj._id !== item._id;
    });
    this.localStorage.setItem('cart-item', JSON.stringify(this.itemArray));
    this.cartItems.next(this.itemArray);
  }

  clearCart() {
    this.itemArray = [];
    this.localStorage.setItem('cart-item', JSON.stringify(this.itemArray));
    this.cartItems.next(this.itemArray);
  }

  getToCart() {
    this.cartItems.next(JSON.parse(this.localStorage.getItem('cart-item')));
    return this.cartItems;
  }
 

  changeCount(val, id) { 
    this.singleProdCountval.next({val, id})
    this.itemArray.find(function (el, index) {
      if(val==0){
        this.itemArray = this.itemArray.filter(function (obj) {
          return obj._id !== id;
        });
      }else if (el._id == id) {
        this.itemArray[index].count = val;
      }
    }, this);
    this.localStorage.setItem('cart-item', JSON.stringify(this.itemArray));
    this.cartItems.next(this.itemArray);
  }


  getCountersingle(id) {
    this.itemArray.find(function (el, index) {
      if (el._id == id) {
        this.singleProdCount.next(el.count);
      }
    }, this);
    return this.singleProdCount;
  }

  checkitemexits(item){
    return this.itemArray.findIndex((el) => el._id == item._id);
  }

  getcount(item){
    return this.itemArray.find((el) => el._id == item._id);
  }

}

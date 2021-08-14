import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit,EventEmitter, Output, ChangeDetectorRef , Inject, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions,Token } from "ngx-stripe";

import { ShareService, CartService } from './../../providers';
import { constants } from './../../constants';


@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  stripeTest: FormGroup;

  @Output() resToken: EventEmitter<Token> =   new EventEmitter<Token>();

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,
    private fb: FormBuilder, private shareService: ShareService, private cartService: CartService,
    private stripeService: StripeService, private router: Router) {

  }


  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  // buy() {
  //   const name = this.stripeTest.get('name').value;
  //   this.stripeService
  //     .createToken(this.card.getCard(), { name })
  //     .subscribe(result => {
  //       if (result.token) {
  //         // Use the token to create a charge or a customer
  //         // https://stripe.com/docs/charges
  //         console.log(result.token.id);
  //         this.resToken.emit(result.token);
  //       } else if (result.error) {
  //         // Error creating the token
  //         console.log(result.error.message);
  //       }
  //     });
  // }

  buy() {
      const name = this.stripeTest.get('name').value;
      this.stripeService
        .createToken(this.card.getCard(), { name })
        .subscribe(result => {
          if (result.token) {
            // Use the token to create a charge or a customer
            // https://stripe.com/docs/charges 
            this.resToken.emit(result.token);
          } else if (result.error) {
            // Error creating the token 
          }
        });
    }
}

  // ngOnInit() {
  //   this.stripeTest = this.fb.group({
  //     name: ['', [Validators.required]]
  //   });
  //   this.stripeService.elements(this.elementsOptions)
  //     .subscribe(elements => {
  //       this.elements = elements;
  //       // Only mount the element the first time
  //       if (!this.card) {
  //         this.card = this.elements.create('card', {
  //           style: {
  //             base: {
  //               iconColor: '#666EE8',
  //               color: '#31325F',
  //               lineHeight: '40px',
  //               fontWeight: 300,
  //               fontSize: '18px',
  //               '::placeholder': {
  //                 color: '#CFD7E0'
  //               }
  //             }
  //           }
  //         });
  //         this.card.mount('#card-element');
  //       }
  //     });
  // }

  // buy() {
  //   const name = this.stripeTest.get('name').value;
  //   this.stripeService
  //     .createToken(this.card, { name })
  //     .subscribe(result => {
  //       if (result.token) {
  //         // Use the token to create a charge or a customer
  //         // https://stripe.com/docs/charges
  //         console.log(result.token);
  //         this.resToken.emit(result.token);
  //       } else if (result.error) {
  //         // Error creating the token
  //         console.log(result.error.message);
  //       }
  //     });
  // }


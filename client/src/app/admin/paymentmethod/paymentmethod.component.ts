import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../providers';
import { constants } from './../../../app/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.scss']
})
export class PaymentmethodComponent implements OnInit {
  paymentMethod: any = { stripe: {} };
  constructor(private http: HttpClient,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,

  ) { }
  ngOnInit() {
    this.getFormData();
  }

  getFormData(){
    this.shareService.getData(constants.getpaymentmethod).subscribe(res => {
      
      this.paymentMethod = res['data'][0];
    });
  }
  onSubmitpaymentMethod({ value }) { 
    this.updateData(this.paymentMethod);
  }



  updateData(val) {
    this.shareService.update(constants.getpaymentmethod, val).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      });
  }
}

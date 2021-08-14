import { Component, OnInit } from '@angular/core';
import { ShareService } from './../../providers';
import { ConfirmationService, MessageService } from 'primeng/api';
import { constants } from '../../constants';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html'
})
export class CouponComponent implements OnInit {
  couponData: any[];
  baseUrl: string;
  display: boolean = false; 
  coupons: any = {};
  imagePreview: any;
  selectedRow: any;
  couponlist: any;
  constructor( private commonServices: ShareService, private messageService: MessageService,
     private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.commonServices.getData(constants.getcoupon).subscribe((res) => {
      this.couponData = res['coupons'];
    });
    this.couponlist = [
      {label: 'Select', value: null},
      {label: 'Fixed Dish', value: 'fixedproduct'},
      {label: 'Percent Dish', value: 'percentproduct'},
      {label: 'Fixed Cart', value: 'fixedcart'},
      {label: 'Percent cart', value: 'percentcart'}
    ];
  }
 
  showDialog(data) {
    this.coupons = {};
    this.display = true;
  }

  onSubmitCoupon({ value }) {
    const data = this.coupons;
    this.display = false;
    
    this.commonServices.postData(constants.getcoupon, data).subscribe(res => {
      this.couponData = [...this.couponData, res['coupons']];
      this.messageService.add({ severity: 'success', summary: 'Error Message', detail: res['message'] });

    });
  }

  handleChange(data) {
    this.commonServices.update(constants.getcoupon, data).subscribe((res) => {
      
    });

  }

  onDeleteCoupon(val) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this data?',
      accept: () => {
        this.commonServices.delete(constants.getcoupon + val._id).subscribe(res => {
          const index = this.couponData.findIndex(x => x._id == val._id);
          this.couponData = this.couponData.filter((data, i) => i !== index);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Data Deleted Successfully' });
        },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
          });
      }
    });
  }
}

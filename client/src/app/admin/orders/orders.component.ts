import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../providers';
import { constants } from '../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  datasource: any;
  totalRecords: number;
  orderdata: any = {};
  driverList: any[] = [];
  display: boolean;
  viewDisp: boolean;
  viewdetail: any;
  resonmodal: boolean;
  selectedorder: any;
  constructor(private http: HttpClient,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getTableData();
    this.getDrivers();
  }

  getTableData() {
    this.shareService.getData(constants.getorder).subscribe(
      results => {
        this.datasource = results['data'];

        this.totalRecords = this.datasource.length;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  getDrivers() {
    this.shareService.getData(constants.getdriver).subscribe(
      results => {
        const dataList = results['data'];
        this.driverList = [{ label: 'Select', value: null }];
        for (let i = 0; i < dataList.length; i++) {
          this.driverList = [...this.driverList, { label: dataList[i].name, value: dataList[i]._id }];
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  assigndriver(data) {
    this.orderdata = data;
    this.display = true;
  }

  showDialog(data) {
    this.viewDisp = true;
    this.viewdetail = data;
    this.viewdetail.orders = JSON.parse(data.orders);
  }


  onSubmitform({ value }) {
    this.updateData(this.orderdata._id, this.orderdata);
    this.display = false;
  }

  updateData(id, val) {

    this.shareService.update(constants.getorder + id, val).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Successfully' });
      this.getTableData();
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  deleteData(val) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this data?',
      accept: () => {
        this.shareService.delete(constants.getorder + val._id).subscribe(res => {
          const index = this.datasource.findIndex(x => x._id == val._id);
          this.datasource = this.datasource.filter((data, i) => i !== index);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Data Deleted Successfully' });
        },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
          });
      }
    });
  }

  updateorderstatus(status, order) {
    let data = { 
      restaurantstatus: status,  
      status: 'PENDING',    
    };

    this.updateData(order._id, data)
  }
  onSubmitrejectform({ value }) {
    console.log(value)
    let data = {
      status: 'REJECTED',
      restaurantstatus: 'REJECTED',
      rejectreason: value.rejectreason
    };
    this.resonmodal = false;

    this.updateData(this.selectedorder, data)
  }
}

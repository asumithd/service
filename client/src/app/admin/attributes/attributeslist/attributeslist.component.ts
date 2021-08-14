import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../../providers';
import { constants } from './../../../../app/constants';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-attributeslist',
  templateUrl: './attributeslist.component.html',
  styleUrls: ['./attributeslist.component.scss']
})
export class AttributeslistComponent implements OnInit {
  datasource: any;
  totalRecords: number;
  cols: any[];
  loading: boolean;
  carModal: boolean;
  selectedrows: any;
  category: any = {};
  imagepath: any;

  constructor(private http: HttpClient,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getcategorys();
    this.imagepath = constants.carImage; 
    this.cols = [
      { field: 'productCode', header: 'code' },
      { field: 'name', header: 'name' },
      { field: 'stock', header: 'stock' },
    ];
  }

  private getcategorys() {
    this.shareService.getData(constants.getattributes).subscribe(
      results => {
        this.datasource = results['data'];
        
        this.totalRecords = this.datasource.length;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

 
  onSubmitform({ value }) {
    const data = this.category;
    this.addData(data);
  }

  updateData(id, val) {
    this.shareService.update(constants.getattributes + id, val).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Successfully' });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }
  onstatusChange(id, val) {
    const updatedData = {
      status: val.checked
    };
    this.updateData(id, updatedData);
  }
  addData(val) {
    this.shareService.postData(constants.getattributes, val).subscribe(res => {
      this.datasource = [...this.datasource, res];
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Successfully' });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      });
  }

  deleteData(val) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this data?',
      accept: () => {
        this.shareService.delete(constants.getattributes + val._id).subscribe(res => {
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

}

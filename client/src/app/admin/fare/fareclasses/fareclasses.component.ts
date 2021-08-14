import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-fareclasses',
  templateUrl: './fareclasses.component.html',
  styleUrls: ['./fareclasses.component.scss']
})
export class FareclassesComponent implements OnInit {
  datasource: any;
  totalRecords: number;
  displayModal: boolean;
  fareclasses: any = {};
  subcategory: any;
  filetoremove: any;
  constructor(
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() { 
    this.getTableData();
  }

  getTableData() { 
    this.shareService.getData(constants.getfareclasses).subscribe(
      results => {
        this.datasource = results['data'];
        
        this.totalRecords = this.datasource.length;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }







  showDialog(data) {
    if (data) {
      this.fareclasses = data;
    } else {
      this.fareclasses = {};
    }
    this.displayModal = true;
  }



  onMapIconImageUpload(event, fieldname) {
    const response = JSON.parse(event.xhr.response);
    if (this.fareclasses[fieldname] === '' || this.fareclasses[fieldname] === undefined) {
      this.fareclasses[fieldname] = response.file[0].filename;
    } else {
      this.filetoremove = [...this.filetoremove, constants.carImagepath + this.fareclasses[fieldname]];
      this.fareclasses[fieldname] = response.file[0].filename;
    }
  }



  removeImage(id, fieldname) {
    this.fareclasses[fieldname] = '';
    this.filetoremove = [...this.filetoremove, constants.carImagepath + id];
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deletefile, this.filetoremove).subscribe(result => {
      
      this.filetoremove = [];
    });
  }


  onSubmitform({ value }) {
    const data = this.fareclasses;
    this.displayModal = false;
    
    if (data._id) {
      this.updateData(data._id, data);
    } else {
      this.addData(data);
    }
  }

  updateData(id, val) {
    this.shareService.update(constants.getfareclasses + id, val).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Successfully' });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }
  onstatusChange(id, val) {
    
    const updatedData = {
      active: val.checked
    };
    this.updateData(id, updatedData);
  }
  addData(val) {
    
    this.shareService.postData(constants.getfareclasses, val).subscribe(res => {
      this.datasource = [...this.datasource, res['data']];
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
        this.shareService.delete(constants.getfareclasses + val._id).subscribe(res => {
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

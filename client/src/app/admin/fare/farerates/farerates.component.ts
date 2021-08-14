import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-farerates',
  templateUrl: './farerates.component.html',
  styleUrls: ['./farerates.component.scss']
})
export class FareratesComponent  implements OnInit {
  datasource: any;
  totalRecords: number;
  displayModal: boolean;
  fareclasses: any = {};
  subcategory: any;
  filetoremove: any;
  fareTypeList: any;
  fareclassList: any;
  constructor(
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getTableData();
    this.fareTypeList = [
      {label: 'Select', value: null},
      {label: 'Fixed Cart', value: 'fixedcart'},
      {label: 'Percent cart', value: 'percentcart'}
    ];
    this.getfareclassList();
  }

  
  getfareclassList() {
    this.shareService.getData(constants.getfareclasses).subscribe(
      results => {
        const fareclassList = results['data']; 
        this.fareclassList = [{ label: 'Select', value: null }];
        for (let i = 0; i < fareclassList.length; i++) { 
          this.fareclassList = [...this.fareclassList, { label: fareclassList[i].title, value: fareclassList[i]._id }];
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  getTableData() { 
    this.shareService.getData(constants.getfarerates).subscribe(
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

 


  onSubmitform({ value }) { 
    const data = value;
    this.displayModal = false;
    
    if (data._id) {
      this.updateData(data._id, data);
    } else {
      this.addData(data);
    }
  }

  updateData(id, val) {
    this.shareService.update(constants.getfarerates + id, val).subscribe(res => {
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
    
    this.shareService.postData(constants.getfarerates, val).subscribe(res => {
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
        this.shareService.delete(constants.getfarerates + val._id).subscribe(res => {
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

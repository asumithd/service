import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../providers';
import { constants } from '../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  datasource: any;
  totalRecords: number;
  modalDisplay: boolean;
  formdata: any = {};
  uploadImage: any;
  previewImage: any;
  filetoremove: any;
  imagepath: String;
  constructor(private http: HttpClient,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getTableData();
    this.uploadImage = constants.uploadcar;
    this.imagepath = constants.carImage;
  }

  getTableData() {
    this.shareService.getData(constants.getbanner).subscribe(
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
      this.formdata = data;
    } else {
      this.formdata = {};
    }
    this.modalDisplay = true;
  }



  onImageUpload(event, fieldname) {
    const response = JSON.parse(event.xhr.response);
    if (this.formdata[fieldname] === '' || this.formdata[fieldname] === undefined) {
      this.formdata[fieldname] = response.file[0].filename;
    } else {
      this.filetoremove = [...this.filetoremove, constants.carImagepath + this.formdata[fieldname]];
      this.formdata[fieldname] = response.file[0].filename;
    }
  }

  viewImage(image) {
    this.previewImage = constants.carImage + '/' + image;
  }

  removeImage(id, fieldname) {
    this.formdata[fieldname] = '';
    this.filetoremove = [...this.filetoremove, constants.carImagepath + id];
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deletefile, this.filetoremove).subscribe(result => { 
      this.filetoremove = [];
    });
  }


  onSubmitform({ value }) {
    const data = this.formdata;
    this.modalDisplay = false; 
    if (data._id) {
      this.updateData(data._id, data);
    } else {
      this.addData(data);
    }
  }

  updateData(id, val) {
    this.shareService.update(constants.getbanner + id, val).subscribe(res => {
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
    this.shareService.postData(constants.getbanner, val).subscribe(res => {
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
        this.shareService.delete(constants.getbanner + val._id).subscribe(res => {
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

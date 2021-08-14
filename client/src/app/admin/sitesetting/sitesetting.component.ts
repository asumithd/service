import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../providers';
import { constants } from './../../../app/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-sitesetting',
  templateUrl: './sitesetting.component.html',
  styleUrls: ['./sitesetting.component.scss']
})
export class SitesettingComponent implements OnInit { 
  settings: any = { seo: {}  };
  imageUploadApi: String;
  imagepath: String;
  filetoremove: any = [];
  constructor(private http: HttpClient,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,

  ) { }
  ngOnInit() {
    this.getFormData();
    this.imageUploadApi = constants.upload;
    this.imagepath = constants.UploadedImage;
  }

  getFormData(){
    this.shareService.getData(constants.getsettings).subscribe(res => {
      
      this.settings = res['data'][0];
    });
  }
  onSubmitForm({ value }) { 
    this.updateData(this.settings);
    // this.createData(this.settings);
  }


  createData(val) {
    this.shareService.postData(constants.getsettings, val).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      });
  }

  updateData(val) {
    this.shareService.update(constants.getsettings, val).subscribe(res => {
      this.removeUnusedFiles();
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      });
  }


  UploadImage(event, fieldname) {
    const response = JSON.parse(event.xhr.response); 

    if (this.settings[fieldname] === '' || this.settings[fieldname] === undefined) {
      this.settings[fieldname] = response.file[0].filename;
    } else {
      this.filetoremove = [...this.filetoremove, constants.Imagepath + this.settings[fieldname]];
      this.settings[fieldname] = response.file[0].filename;
    }
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deletefile, this.filetoremove).subscribe(result => {
      
      this.filetoremove = [];
    });
  }

}

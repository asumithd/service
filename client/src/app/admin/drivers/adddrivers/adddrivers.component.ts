import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../../providers';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-adddrivers',
  templateUrl: './adddrivers.component.html',
  styleUrls: ['./adddrivers.component.scss']
})
export class AdddriversComponent implements OnInit {
  driver: any = {};
  carModel: any;
  documentlist: any;
  imageUploadApi: any;
  imagepath: any;
  filetoremove: any = [];
  pagetype: any;
  pageId: any;

  constructor(private http: HttpClient,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.imageUploadApi = constants.upload;
    this.imagepath = constants.UploadedImage;

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.pagetype = 'Edit';
        this.pageId = params['id'];
        this.getdriver(params['id']);
      } else {
        this.pagetype = 'Add';
      }
    });

  }

  getdriver(id) {
    this.shareService.getData(constants.getdriver + id).subscribe(
      results => {
        
        this.driver = results['data'][0];
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }




  onSubmitdriver({ value }) {

    if (this.pagetype === 'Add') {
      this.addData(value);
    } else {
      this.updateData(value);
    }



  }

  addData(value) {

    this.shareService.postData(constants.getdriver + 'register', value).subscribe(res => {
      
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Successfully' });
      this.driver = {};
      this.removeUnusedFiles();
      this.router.navigate(['/admin/driverslist']);
    },
      err => { 
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      });
  }
  updateData(value) {
    this.shareService.update(constants.getdriver +  this.pageId, value).subscribe(res => { 
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Successfully' });
      this.removeUnusedFiles();
    },
      err => { 
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      });
  }
  UploadImage(event, fieldname) {
    const response = JSON.parse(event.xhr.response);

    if (this.driver[fieldname] === '' || this.driver[fieldname] === undefined) {
      this.driver[fieldname] = response.file[0].filename;
    } else {
      this.filetoremove = [...this.filetoremove, constants.Imagepath + this.driver[fieldname]];
      this.driver[fieldname] = response.file[0].filename;
    }
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deletefile, this.filetoremove).subscribe(result => {
      
      this.filetoremove = [];
    });
  }

}

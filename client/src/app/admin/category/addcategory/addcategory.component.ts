import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../../providers';
import { constants } from './../../../../app/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  category: any = {};
  uploadcar: any;
  previewImage: any;
  pagetype: string;
  pageId: any;
  filetoremove: any[] = [];
  constructor(private http: HttpClient,
    private shareService: ShareService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.pagetype = 'Edit';
        this.pageId = params['id'];
        this.getcategory(params['id']);
      } else {
        this.pagetype = 'Add';
      }
    }); 
    this.uploadcar = constants.uploadcar;
  }

  getcategory(id) {
    this.shareService.getData(constants.getcategory + id).subscribe(
      results => {
        this.category = results['data'][0];
        this.category.type = results['data'][0].type._id;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }


  onMapIconImageUpload(event, fieldname) {
    const response = JSON.parse(event.xhr.response); 
    if (this.category[fieldname] === '' || this.category[fieldname] === undefined) {
      this.category[fieldname] = response.file[0].filename;
    } else { 
      this.filetoremove = [...this.filetoremove, constants.carImagepath + this.category[fieldname]];
      this.category[fieldname] = response.file[0].filename;
    }
  }

  viewImage(image) {
    this.previewImage = constants.carImage + '/' + image;
  }

  onSubmitcategory({ value }) { 
    if (this.pagetype === 'Add') {
      this.addData(value);
    } else {
      this.updateData(value);
    }

  }

  addData(val) {
    
    this.shareService.postData(constants.getcategory, val).subscribe(res => {
      
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Successfully' });
      this.router.navigate(['/admin/categorylist']);
      this.category = {};
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      });
  }

  updateData(val) {
    this.shareService.update(constants.getcategory + this.pageId, val).subscribe(res => {
      this.removeUnusedFiles();
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      });
  }

  removeImage(id, fieldname) {
    this.category[fieldname] = '';
    this.filetoremove = [...this.filetoremove, constants.carImagepath + id];
  } 

  removeUnusedFiles() {
    this.shareService.postData(constants.deletefile, this.filetoremove).subscribe(result => {
      
      this.filetoremove = [];
    });
  }

}

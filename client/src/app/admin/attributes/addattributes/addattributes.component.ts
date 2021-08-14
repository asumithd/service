import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../../providers';
import { constants } from './../../../../app/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-addattributes',
  templateUrl: './addattributes.component.html',
  styleUrls: ['./addattributes.component.scss']
})
export class AddattributesComponent implements OnInit {
  attibutesdata: any = { };
  uploadcar: any;
  previewImage: any;
  pagetype: string;
  pageId: any;
  adddishForm: any; 
  filetoremove: any[] = [];
  categoryList: any[];
  subcategoryList: any[]; 
  options: any[];
  attribute: any = {}; 
  option: any = {}; 
  dish: any;
  @ViewChild('attributeForm') attributeForm;
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
        this.getattribute(params['id']);
      } else {
        this.pagetype = 'Add';
      }
    }); 
   
    this.options = [];
  }

  getattribute(id) {
    this.shareService.getData(constants.getattributes + id).subscribe(
      results => {
        this.attibutesdata = results['data'][0];
        this.options = this.attibutesdata.option;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  addOptions({ value }) { 
    
    this.options = [...this.options, { key: value.label.trim(), label: value.label }];
    this.attributeForm.controls.option.reset(); 
  }

  removeOption(index) {
    this.options = this.options.filter((data, i) => i !== index);
  }

 
  
 
 
 

  onSubmitdish({ value }) { 
    value.option = this.options;
    if (this.pagetype === 'Add') {
      this.addData(value);
    } else {
      this.updateData(value);
    }

  }

  addData(val) { 
    
    this.shareService.postData(constants.getattributes, val).subscribe(res => {
      
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Successfully' });
      this.router.navigate(['/admin/attributes']);
      this.dish = {};
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      });
  }

  updateData(val) {
    this.shareService.update(constants.getattributes + this.pageId, val).subscribe(res => {
 
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      });
  } 

}

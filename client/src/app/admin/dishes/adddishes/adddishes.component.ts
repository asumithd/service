import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../../providers';
import { constants } from './../../../../app/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-adddishes',
  templateUrl: './adddishes.component.html',
  styleUrls: ['./adddishes.component.scss']
})
export class AdddishesComponent implements OnInit {
  dish: any = { customize: [] };
  uploadcar: any;
  customizableModal: boolean;
  previewImage: any;
  pagetype: string;
  pageId: any;
  adddishForm: any;
  filetoremove: any[] = [];
  categoryList: any[];
  subcategoryList: any[];
  choiceType: any[];
  options: any[];
  attribute: any = {};
  attributeArray: any[] = [];
  option: any = {customizable: true};
  attibutesdata: any;
  attributeslist: any = [{ label: 'Select choice', value: null }];
  selectedmainattribute: any;
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
        this.getcategory(params['id']);
      } else {
        this.pagetype = 'Add';
      }
    });
    this.uploadcar = constants.uploadcar;
    this.getcategoryList();
    this.getsubcategoryList();

    this.choiceType = [
      { label: 'Select choice', value: null },
      { label: 'Multi Select', value: 'checkbox' },
      { label: 'Single Select', value: 'radio' }
    ];
    this.options = [];
    this.getattribute();
  }

  getattribute() {
    this.shareService.getData(constants.getattributes).subscribe(
      results => {
        this.attibutesdata = results['data'];
        this.attibutesdata.forEach((element, index) => {          
          this.attributeslist = [...this.attributeslist, { label: element.label, value: element.label , price: 0, }];
        });
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  addOptions({ value }) {
    this.options = [...this.options, { key: value.label.trim(), label: value.label, price: value.price }];
    this.attributeForm.controls.option.reset();
  }

  removeOption(index) {
    this.options = this.options.filter((data, i) => i !== index);
  }

  selectattr(ev) {
    let ind = this.attibutesdata.findIndex((el) => el.label == ev.value);
    this.attibutesdata[ind].option.forEach(element => {
      element.price = 0;
      element.customizable = true;
    });
    this.selectedmainattribute = this.attibutesdata[ind].option;
    
  }
  addAttribute({ value }) {
    value.option = this.selectedmainattribute;  
    this.attributeArray = [...this.attributeArray , value] 
    this.selectedmainattribute =  null;
    // this.attributeForm.reset();
    this.customizableModal = false;
  }

  removeAttribute(index) {
    this.attributeArray = this.attributeArray.filter((data, i) => i !== index);
  }



  getcategoryList() {
    this.shareService.getData(constants.getcategory).subscribe(
      results => {
        const category = results['data'];
        this.categoryList = [{ label: 'Select Category', value: null }];
        for (let i = 0; i < category.length; i++) {
          this.categoryList = [...this.categoryList, { label: category[i].name, value: category[i]._id }];
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }


  getsubcategoryList() {
    this.shareService.getData(constants.getsubcategory).subscribe(
      results => {
        const category = results['data'];
        this.subcategoryList = [{ label: 'Select Subcategory', value: null }];
        for (let i = 0; i < category.length; i++) {
          this.subcategoryList = [...this.subcategoryList, { label: category[i].name, value: category[i]._id }];
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  getcategory(id) {
    this.shareService.getData(constants.getproduct + id).subscribe(
      results => {
        this.dish = results['data'][0];
        this.attributeArray = this.dish.variations;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }




  onMapIconImageUpload(event, fieldname) {
    const response = JSON.parse(event.xhr.response);
    if (this.dish[fieldname] === '' || this.dish[fieldname] === undefined) {
      this.dish[fieldname] = response.file[0].filename;
    } else {
      this.filetoremove = [...this.filetoremove, constants.carImagepath + this.dish[fieldname]];
      this.dish[fieldname] = response.file[0].filename;
    }
  }

  viewImage(image) {
    this.previewImage = constants.carImage + '/' + image;
  }

  onSubmitdish({ value }) {
    value.variations = this.attributeArray;
    if (this.pagetype === 'Add') {
      this.addData(value);
    } else {
      this.updateData(value);
    }

  }

  addData(val) {

    this.shareService.postData(constants.getproduct, val).subscribe(res => {

      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Successfully' });
      this.router.navigate(['/admin/dishesList']);
      this.dish = {};
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      });
  }

  updateData(val) {
    this.shareService.update(constants.getproduct + this.pageId, val).subscribe(res => {
      this.removeUnusedFiles();
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      });
  }

  removeImage(id, fieldname) {
    this.dish[fieldname] = '';
    this.filetoremove = [...this.filetoremove, constants.carImagepath + id];
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deletefile, this.filetoremove).subscribe(result => {

      this.filetoremove = [];
    });
  }

}

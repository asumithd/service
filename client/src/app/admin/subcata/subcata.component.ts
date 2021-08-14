import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../providers';
import { constants } from '../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-subcata',
  templateUrl: './subcata.component.html',
  styleUrls: ['./subcata.component.scss']
})
export class SubcataComponent implements OnInit {
  datasource: any;
  totalRecords: number;
  loading: boolean;
  carModal: boolean;
  selectedrows: any;
  subcata: any = {};
  yearlist: any[];
  makerlist: any[];
  categoryllist: any[];
  uploadImage: any;
  subcategory: any;
  previewImage: any;
  filetoremove: any;
  categoryList: any[] = [];
  imagepath: String;
  constructor(private http: HttpClient,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // this.getCarModelInputs();
    this.getCarModels();
    this.uploadImage = constants.uploadcar;
this.getcategorys();
this.imagepath = constants.carImage;
  }

  getCarModels() {
    this.shareService.getData(constants.getsubcategory).subscribe(
      results => {
        this.datasource = results['data'];
        
        this.totalRecords = this.datasource.length;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  getcategorys() {
    this.shareService.getData(constants.getcategory).subscribe(
      results => {
        const category = results['data']; 
        this.categoryList = [{ label: 'Select', value: null }];
        for (let i = 0; i < category.length; i++) { 
          this.categoryList = [...this.categoryList, { label: category[i].name, value: category[i]._id }];
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  getCarModelInputs() {
    this.shareService.getData(constants.getCarModelInputs).subscribe(
      results => {
        this.yearlist = results['data'].Modelyear;
        this.makerlist = results['data'].Ridetypes;
        this.categoryllist = results['data'].categorys;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }



  showDialog(data) {
    if (data) {
      this.subcata = data;
    } else {
      this.subcata = {};
    }
    this.carModal = true;
  }



  onMapIconImageUpload(event, fieldname) {
    const response = JSON.parse(event.xhr.response);
    if (this.subcata[fieldname] === '' || this.subcata[fieldname] === undefined) {
      this.subcata[fieldname] = response.file[0].filename;
    } else {
      this.filetoremove = [...this.filetoremove, constants.carImagepath + this.subcata[fieldname]];
      this.subcata[fieldname] = response.file[0].filename;
    }
  }

  viewImage(image) {
    this.previewImage = constants.carImage + '/' + image;
  }

  removeImage(id, fieldname) {
    this.subcata[fieldname] = '';
    this.filetoremove = [...this.filetoremove, constants.carImagepath + id];
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deletefile, this.filetoremove).subscribe(result => {
      
      this.filetoremove = [];
    });
  }


  onSubmitform({ value }) {
    const data = this.subcata;
    this.carModal = false;
    
    if (data._id) {
      this.updateData(data._id, data);
    } else {
      this.addData(data);
    }
  }

  updateData(id, val) {
    this.shareService.update(constants.getsubcategory + id, val).subscribe(res => {
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
    
    this.shareService.postData(constants.getsubcategory, val).subscribe(res => {
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
        this.shareService.delete(constants.getsubcategory + val._id).subscribe(res => {
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

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './../../../providers';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit {
  datasource: any[];
  totalRecords: number;
  cols: any[];

  constructor(private http: HttpClient,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {

    this.shareService.getData(constants.getcustomer).subscribe(res => {
      this.datasource = res['customer'];
       this.totalRecords = this.datasource.length;
    });

    this.cols = [
      { field: 'username', header: 'Name' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'email', header: 'Email' },
      { field: 'verified', header: 'Verified' }
    ];
  }


}



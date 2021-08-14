import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from './../../../providers/share.service';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-subadminlist',
  templateUrl: './subadminlist.component.html',
  styleUrls: ['./subadminlist.component.scss']
})

export class SubadminlistComponent implements OnInit {

  datasource: any;
  totalRecords: number;
  cols: any[];

  constructor(private shareService: ShareService, private router: Router, private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getSubadmins();
    this.cols = [
      { field: 'firstname', header: 'First name' },
      { field: 'lastname', header: 'Last name' },
      { field: 'email', header: 'Email' },
      { field: 'updatedAt', header: 'updatedAt' }
     ];
  }

  private getSubadmins() {
    this.shareService.getData(constants.getSubAdmin).subscribe(
      results => {
        this.datasource = results;
        
        this.totalRecords = this.datasource.length;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {constants } from '../../../constants';
import { ShareService } from '../../../providers';



@Component({
  selector: 'app-driverslist',
  templateUrl: './driverslist.component.html',
  styleUrls: ['./driverslist.component.scss']
})
export class DriverslistComponent implements OnInit {
  datasource: any;
  cars: any[];
  totalRecords: number;
  cols: any[];
  loading: boolean;

  constructor(private shareService: ShareService ) { }

  ngOnInit() {

    this.shareService.getData(constants.getdriver).subscribe(res => {
      
      this.datasource = res['data'];
      this.totalRecords = this.datasource.length;
    });

    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'email', header: 'email' },
      { field: 'mobile', header: 'mobile' }
    ];
  }

}



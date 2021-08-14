import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from './../../../providers';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-addsubadmin',
  templateUrl: './addsubadmin.component.html',
  styleUrls: ['./addsubadmin.component.scss']
})
export class AddsubadminComponent implements OnInit {
  subadmin: any = {
    privileges: {
      locations: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      users: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      drivers: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      categorys: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      vehicles: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      carmakers: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      documents: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      earnings: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      languages: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      fares: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      coupons: { 'view': false, 'add': false, 'edit': false, 'delete': false },
      templates: { 'view': false, 'add': false, 'edit': false, 'delete': false }
    }
  };
  pagetype: any;
  pageId: any;
  constructor(
    private shareService: ShareService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.pagetype = 'Edit';
        this.pageId = params['id'];
        this.getsubadmin(params['id']); 
      } else {
        this.pagetype = 'Add';
      }
    });


  }

  getsubadmin(id) {
   
    this.shareService.getData(constants.getSubAdmin + id).subscribe(
      results => {
        
        this.subadmin = results['data'][0];
        this.subadmin.privileges = JSON.parse(results['data'][0].privilege); 
      },

      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  onSubmit() { 
    if (this.subadmin.privileges)
      this.subadmin.privilegestr = JSON.stringify(this.subadmin.privileges);
    this.shareService.postData(constants.register, this.subadmin).subscribe(() => {
      this.router.navigateByUrl('/admin/dashboard');
    }, (err) => {
      console.error(err);
    });
  }

}

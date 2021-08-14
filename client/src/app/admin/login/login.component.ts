import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService, AuthenticationService } from './../../providers';
import { constants } from '../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private shareService: ShareService, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() { }

  login() {
    this.shareService.postData(constants.login, this.credentials).subscribe((res) => {
      this.auth.saveToken(res.user, res.token);
      this.router.navigateByUrl('/admin/dashboard');
    }, (err) => {
      console.error(err);
    });
  }

}

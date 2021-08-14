import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn('admin')) {
      this.router.navigateByUrl('/admin/login');
      return false;
    }
    return true;
  }
}



@Injectable()
export class DriverAuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn('driver')) {
      this.router.navigateByUrl('/driver/login');
      return false;
    }
    return true;
  }
}

@Injectable({providedIn: 'root'})
export class CustomerAuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn('customer')) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}

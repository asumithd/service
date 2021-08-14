import { LOCAL_STORAGE, WINDOW, } from '@ng-toolkit/universal';
import { Injectable, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface Expiry {
  exp: number;
  iat: number;
}


@Injectable()
export class AuthenticationService {
  private admintoken: string;
  private usertoken: string;
  private drivertoken: any;
  public isLogged = new BehaviorSubject(false);


  public userdetail = new BehaviorSubject(null);
  $userdetail = this.userdetail.asObservable();


  public admindetail = new BehaviorSubject(null);
  $admindetail = this.admindetail.asObservable();


  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();


  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private http: HttpClient, private router: Router) { }

  public saveToken(user: string, token: string): void {
    if (user === 'customer') {
      this.localStorage.setItem('logged', user);
      this.localStorage.setItem('user-token', token);
      this.usertoken = token;
      this.changeState(true);
      this.logout();
      this.driverlogout();
    } else if (user === 'driver') {
      this.localStorage.setItem('logged', user);
      this.localStorage.setItem('driver-token', token);
      this.usertoken = token;
      this.changeState(true);
      this.logout();
      this.customerlogout();
    } else if (user === 'admin') {
      this.localStorage.setItem('logged', user);
      this.localStorage.setItem('admin-token', token);
      this.admintoken = token;
      this.customerlogout();
      this.driverlogout();
    }
  }

  public getToken(type): string {
    if (type === 'customer') {
      this.usertoken = this.localStorage.getItem('user-token');
      return this.usertoken;
    }
    if (type === 'admin') {
      this.admintoken = this.localStorage.getItem('admin-token');
      return this.admintoken;
    }
    if (type === 'driver') {
      this.drivertoken = this.localStorage.getItem('driver-token');
      return this.drivertoken;
    }
  }

  public getExpiry(type) {
    const token = this.getToken(type);
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = this.window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public getUser(type) {
    if (this.isLoggedIn) {
      this.userdetail.next(this.getExpiry(type));
      return this.getExpiry(type);
    } else {
      return false;
    }
  }

  public isLoggedIn(type): boolean {
    const user = this.getExpiry(type);
    if (user) {
      this.changeState(user.exp > Date.now() / 1000);
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  getloginState(type) {
    this.getExpiry(type) ? this.changeState(this.getExpiry(type).exp > Date.now() / 1000) : this.changeState(false);
    return this.isLogged;
  }

  changeState(state) {
    this.isLogged.next(state);
  }


  public customerlogout(): void {

    this.usertoken = '';
    this.localStorage.removeItem('user-token');
    this.userdetail.next(null);
    this.changeState(false);
  }

  public driverlogout(): void {

    this.drivertoken = '';
    this.localStorage.removeItem('driver-token');
  }


  public logout(): void {
    this.admintoken = '';
    this.localStorage.removeItem('admin-token');
  }
}

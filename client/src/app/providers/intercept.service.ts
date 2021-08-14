import { Injectable, Component, Inject } from '@angular/core'; 
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { LOCAL_STORAGE, WINDOW, } from '@ng-toolkit/universal';

import {   MessageService } from 'primeng/api';


@Injectable() // {providedIn: 'root'}

export class InterceptService implements HttpInterceptor {

	constructor(
		@Inject(LOCAL_STORAGE) private localStorage: any,
		private auth: AuthenticationService, private messageService: MessageService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	let currentlogintype =	localStorage.getItem('logged'); 
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken(currentlogintype)}`
			}
		});


		return next.handle(request)
			.pipe(
			tap(event => {
				if (event instanceof HttpResponse) {

					// console.log(event);
				}
			}, error => { 
				let errormessage;
				error.error.message ?   errormessage =  error.error.message :  errormessage =  error.message;
				this.messageService.add({ severity: 'error', summary:   error.status +' -' + error.statusText, detail: errormessage});
			})
			)

	};


}

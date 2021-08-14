import { NgtUniversalModule } from '@ng-toolkit/universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { InterceptService } from './providers/intercept.service';
import { AuthenticationService, AuthGuardService, DriverAuthGuardService } from './providers';
import { DatePipe, CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminModule } from './admin/admin.module';
import { Globals } from './globals';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    NgtUniversalModule,
    TransferHttpCacheModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    AppRouting,
    SocketIoModule.forRoot(config)

  ],
  providers: [
    Globals,
    AuthenticationService,
    DriverAuthGuardService,
    AuthGuardService,
    InterceptService,
    ConfirmationService,
    MessageService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }
  ],
})
export class AppModule { }

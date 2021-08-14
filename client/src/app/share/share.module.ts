import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {
  DropdownModule, CalendarModule, PanelModule, TabViewModule,
  CheckboxModule, FileUploadModule, InputSwitchModule, GMapModule,
  SelectButtonModule,
  RadioButtonModule,
} from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxStripeModule } from 'ngx-stripe';
import { CounterComponent } from './counter/counter.component';
import { ProductcounterComponent } from './productcounter/productcounter.component';


import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { StripeComponent } from './stripe/stripe.component';
import { LocationbarComponent } from './locationbar/locationbar.component';
import { DirectiontrackerComponent } from './directiontracker/directiontracker.component';
import { trackerComponent } from './tracker/tracker.component';
import { RemovewhitespacesPipe } from './pipes/removewhitespaces-pipe.pipe';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GMapModule,
    SelectButtonModule,
    GooglePlaceModule,
    CheckboxModule,
    RadioButtonModule,
    NgxStripeModule.forRoot('pk_test_1gcuA4agFTW8D1qYc9rWfVbX')
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    TableModule,
    DropdownModule,
    FileUploadModule,
    InputSwitchModule,
    SelectButtonModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    GMapModule,
    ToastModule,
    HttpClientModule,
    GooglePlaceModule,
    CounterComponent,
    SingleproductComponent,
    TabViewModule,
    StripeComponent,
    LocationbarComponent,
    DirectiontrackerComponent,
    trackerComponent,
    RemovewhitespacesPipe,
    LoaderComponent,
    ProductcounterComponent
  ],
  declarations: [
    CounterComponent,
    SingleproductComponent,
    StripeComponent,
    LocationbarComponent, 
    DirectiontrackerComponent,
    trackerComponent,
    RemovewhitespacesPipe,
    LoaderComponent,
    ProductcounterComponent
  ]
})
export class ShareModule { }

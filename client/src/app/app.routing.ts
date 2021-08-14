import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'admin'
   
  },
    {
      path: 'admin',
      loadChildren: './../app/admin/admin.module#AdminModule'
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
  })
  export class AppRouting {}

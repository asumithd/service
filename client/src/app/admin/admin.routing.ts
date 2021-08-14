import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './../providers';
import { AdminComponent } from './../admin/admin.component';
import { DashboardComponent } from './../admin/dashboard/dashboard.component';
import { LoginComponent } from './../admin/login/login.component';
import { AddusersComponent } from './users/addusers/addusers.component';
import { UserslistComponent } from './users/userslist/userslist.component';
import { DriverslistComponent } from './drivers/driverslist/driverslist.component';
import { AdddriversComponent } from './drivers/adddrivers/adddrivers.component';
import { AddsubadminComponent } from './subadmin/addsubadmin/addsubadmin.component';
import { SubadminlistComponent } from './subadmin/subadminlist/subadminlist.component';
import { CategoryComponent } from './category/category.component';
import { SubcataComponent } from './subcata/subcata.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { AdddishesComponent } from './dishes/adddishes/adddishes.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { OrdersComponent } from './orders/orders.component';
import { CouponComponent } from './coupon/coupon.component';
import { FareclassesComponent } from './fare/fareclasses/fareclasses.component';
import { FareratesComponent } from './fare/farerates/farerates.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { SitesettingComponent } from './sitesetting/sitesetting.component';
import { BannerComponent } from './banner/banner.component';
import { AttributeslistComponent } from './attributes/attributeslist/attributeslist.component';
import { AddattributesComponent } from './attributes/addattributes/addattributes.component';
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '', component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'adduser', component: AddusersComponent },
            { path: 'userslist', component: UserslistComponent },
            { path: 'adddriver', component: AdddriversComponent },
            { path: 'editdriver/:id', component: AdddriversComponent },
            { path: 'driverslist', component: DriverslistComponent },
            { path: 'addsubadmin', component: AddsubadminComponent },
            { path: 'subadminlist', component: SubadminlistComponent },
            { path: 'editsubadminlist/:id', component: AddsubadminComponent },
            { path: 'categorylist', component: CategoryComponent },
            { path: 'addcategory', component: AddcategoryComponent },
            { path: 'editcategory/:id', component: AddcategoryComponent },
            { path: 'subcategorylist', component: SubcataComponent },
            { path: 'adddishes', component: AdddishesComponent },
            { path: 'dishesList', component: DishListComponent },
            { path: 'editdishes/:id', component: AdddishesComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'coupons', component: CouponComponent },
            { path: 'fareclasses', component: FareclassesComponent },
            { path: 'farerate', component: FareratesComponent },
            { path: 'paymentMethod', component: PaymentmethodComponent },
            { path: 'sitesetting', component: SitesettingComponent },
            { path: 'banner', component: BannerComponent},
            { path: 'attributes', component: AttributeslistComponent},
            { path: 'addattributes', component: AddattributesComponent},
            { path: 'addattributes/:id', component: AddattributesComponent},



        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class AdminRouting { }

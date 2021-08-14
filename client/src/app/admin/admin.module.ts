import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AdminRouting } from './admin.routing';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddusersComponent } from './users/addusers/addusers.component';
import { UserslistComponent } from './users/userslist/userslist.component';
import { DriverslistComponent } from './drivers/driverslist/driverslist.component';
import { AdddriversComponent } from './drivers/adddrivers/adddrivers.component';
import { DriverdashboardComponent } from './drivers/driverdashboard/driverdashboard.component'; 
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

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        AdminRouting
    ],
    declarations: [
        AdminComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        LoginComponent,
        SidebarComponent,
        AddusersComponent,
        UserslistComponent,
        DriverslistComponent,
        AdddriversComponent,
        DriverdashboardComponent,
        AddsubadminComponent,
        SubadminlistComponent,
        CategoryComponent,
        SubcataComponent,
        AddcategoryComponent,
        AdddishesComponent,
        DishListComponent,
        OrdersComponent,
        CouponComponent,
        FareclassesComponent,
        FareratesComponent,
        PaymentmethodComponent,
        SitesettingComponent,
        BannerComponent, 
        AttributeslistComponent,
        AddattributesComponent
    ]
})

export class AdminModule { }
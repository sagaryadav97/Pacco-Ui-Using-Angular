import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard'
import { ParcelComponent } from './parcel.component';
import { OrderComponent } from './order.component';
import { VehicleComponent } from './vehicle.component';
import { DeliverydateComponent } from './deliverydate.component'
import { DeliveryinfoComponent } from './deliveryinfo.component'
import { OrderupdateComponent } from './orderupdate.component'


export const routes: Routes = [
    {path: 'Home', component: HomeComponent,canActivate:[AuthGuard]},
    {path: 'login', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'parcel', component: ParcelComponent,canActivate:[AuthGuard]},
    {path: 'order', component:OrderComponent,canActivate:[AuthGuard]},
    {path: 'vehicle', component: VehicleComponent,canActivate:[AuthGuard]},
    {path: 'deliveryinfo', component: DeliveryinfoComponent,canActivate:[AuthGuard]},
    {path: 'deliverydate', component: DeliverydateComponent,canActivate:[AuthGuard]},
    {path: 'orderupdate', component: OrderupdateComponent,canActivate:[AuthGuard]} 
  ];
 

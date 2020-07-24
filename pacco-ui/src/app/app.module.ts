import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule} from '@angular/forms'
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { User} from './user';
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ProviderAst } from '@angular/compiler';
import  { ParcelComponent } from './parcel.component'
import  { OrderComponent } from './order.component'
import { VehicleComponent } from './vehicle.component'
import { DeliverydateComponent } from './deliverydate.component'
import { DeliveryinfoComponent } from './deliveryinfo.component'
import { OrderupdateComponent } from './orderupdate.component'
import { Vehile } from './vehicles';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr'
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    ParcelComponent,
    OrderComponent,
    VehicleComponent,
    DeliverydateComponent,
    DeliveryinfoComponent,
    OrderupdateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularToastifyModule,
    ToastrModule.forRoot()
  ],
  providers: [User,Vehile,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpResponseBase, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { Vehile } from './vehicles'
@Component({
    selector: 'app-orderupdate',
    templateUrl: './orderupdate.component.html'
})
export class OrderupdateComponent  implements OnInit {
    title = 'pacco-ui';
    error = null;
    ErrorState = false;
    vehiclestatusget = false;
    vehiclestatus = false;
    vehicleparceldetials = null;
    vehicledata=null;
    vehicledetials = null;
    vehicleparceldetialstatus = false;
    vehiclestatusid = false;
    token = localStorage.getItem('token')

    constructor(public vehile: Vehile, private req: DataService, private router: Router) {

    }
    ngOnInit() {
        this.vehiclestatus = true;

    }

 //Parcels Section
 Vehicleadd(form : NgForm){
    this.req.Vehicleadd(form.value).subscribe((data: any) => {
        console.log("vehicle Post Working")
        console.log("vehicleId"+localStorage.getItem("vehicleId"))
        if (data.status == 201) {
            this.vehiclestatusget = true;
            this.vehicleget;
            this.vehiclestatus = false;
        }
    }, (error) => {
        this.error = error;
        this.ErrorState = true;
    })
}
//

//
vehicleget(){
this.req.getvehicle().subscribe(data =>{
    console.log("getvehicle Get working"+data)
    console.log(data)
    this.vehicledetials = data;
},(error)=>{
  console.log(error)
  this.ErrorState = true;
})
}
//


//
vehicleavilable(){
this.req.vehicleavilable().subscribe((data: any) => {
    console.log("vehicle avilable Post Working")
    console.log(data)
    if (data.status == 200) {
        this.vehiclestatusget = false;
        this.vehicleresourcesget;
        this.vehicledetials = data;
        this.vehiclestatusid = true;
        this.vehiclestatus = false;
    }
}, (error) => {
    this.error = error;
    this.ErrorState = true;
})
}
//

//
vehicleresourcesget(){
this.req.getvehicleresources().subscribe(data =>{
    console.log("get vehicle resources working"+data)
    console.log(data)
    this.vehicledata = data;
},(error)=>{
  console.log(error)
  this.ErrorState = true;
})
}
   //
  parcelget(){
    this.req.parcelget().subscribe(data =>{
        console.log("Parcel Get working"+data)
        console.log(data)
        this.vehicledetials = data;
        this.vehiclestatusget = true;
    },(error)=>{
      console.log(error)
      this.ErrorState = true;
    })
  }
//





}

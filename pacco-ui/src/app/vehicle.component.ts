import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpResponseBase, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { Vehile } from './vehicles'
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent  implements OnInit {
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

    constructor(public toastr:ToastrService,public vehicle: Vehile, private req: DataService, private router: Router) {

    }
    ngOnInit() {
        this.vehiclestatus = true;

    }

 //Parcels Section
 Vehicleadd(form : NgForm){
    this.req.Vehicleadd(form.value).subscribe((data: any) => {
        console.log("vehicle Post Working"+data)
        console.log("vehicleId"+localStorage.getItem("vehicleId"))
        console.log(data.status)
        if (data.status === 201) {
            console.log("condition Working")
            this.vehiclestatusget = true;
            this.vehicleget();
            this.vehiclestatus = false;
            this.toastr.success("Vehicle Added Successfully")
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
    if (data.status === 200) {
        console.log("getvehicle Get working"+data)
        console.log(data)
        this.vehicledetials = data;
    }
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
    if (data.status == 201) {
        this.vehiclestatusget = false;
        this.vehicleresourcesget();
        this.vehicledetials = data;
        this.vehiclestatusid = true;
        this.vehiclestatus = false;
        this.toastr.success("Vehicle Made Available Success")
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
    if (data.status == 200) {
    console.log("get vehicle resources working"+data)
    console.log(data)
    this.vehicledata = data;
    }
},(error)=>{
  console.log(error)
  this.ErrorState = true;
})
}
//

}

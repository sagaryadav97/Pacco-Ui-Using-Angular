import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpResponseBase, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-parcel',
    templateUrl: './parcel.component.html'
})
export class ParcelComponent {
    title = 'pacco-ui';
    error = null;
    ErrorState = false;
    pstatusget = false;
    pstatusgetvolume = false;
    pstatus = true;
    parceldetials = null;
    parceldetialstatus = false;
    token = localStorage.getItem('token')

    constructor(public tostr:ToastrService ,public user: User, private req: DataService, private router: Router) {

    }

    //Parcels Section
    parcels(form: NgForm) {
        console.log(form.value)
        this.req.parcels(form.value).subscribe((data: any) => {
            console.log("parcels Post Working")
            console.log("Parcel Id"+localStorage.getItem("parcelId"))
            if (data.status == 201) {
                this.pstatusget = true;
                this.pstatus = false;
                this.tostr.info("Parcel Created Successfully")
            }
        }, (error) => {
            console.log(error)
            this.error = error;
            this.ErrorState = true;
        })
    }
    //

    //
  parcelget(){
    this.req.parcelget().subscribe((data:any) =>{
        console.log("Parcel Get working"+data);
        console.log(data.status)
        console.log(data.status)

        if(data.status == 200) {
            console.log("code "+data.status)
            this.pstatusget = false;
            this.parceldetialstatus = true
        this.parceldetials = data;
        }
    },(error)=>{
      console.log(error)
      this.ErrorState = true;
    })
  }
//

//Calculate the parcel volume
volume(){
    this.req.getvolume().subscribe(data =>{
        console.log("volume Get working"+data)
        console.log(data)
        this.parceldetials = data;
        this.pstatusget = false;
        
        this.pstatusgetvolume = true;
    },(error)=>{
        this.pstatusgetvolume = true;

      console.log(error)
      this.ErrorState = true;
    })
}
//




}

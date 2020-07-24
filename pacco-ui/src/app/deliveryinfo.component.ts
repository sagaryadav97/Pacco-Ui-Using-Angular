import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpResponseBase, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { Vehile } from './vehicles'
@Component({
    selector: 'app-deliveryinfo',
    templateUrl: './deliveryinfo.component.html'
})
export class DeliveryinfoComponent  implements OnInit {
    title = 'pacco-ui';
    error = null;
    ErrorState = false;
    infostatusget = false;
    infostatus = false;
    infoparceldetials = null;
    infodata=null;
    infodetials = null;
    infoparceldetialstatus = false;
    infostatusid = false;
    token = localStorage.getItem('token')
    completdetails = false;
    constructor(public vehile: Vehile, private req: DataService, private router: Router) {

    }
    ngOnInit() {
        this.infostatus = true;

    }

 //start delivery Section
 startdelivery(des){
    this.req.startdelivery(des).subscribe((data: any) => {
        console.log("start delivery Post Working")
        console.log(data)
        if (data.status == 201) {
            this.infostatusget = true;
            this.infodetials = data;
            this.infostatus = false;
        }
    }, (error) => {
        this.error = error;
        this.ErrorState = true;
    })
}
//

//
transportationdetails(tes){
this.req.transportationdetails(tes).subscribe(data =>{
    console.log("transportation details working"+data)
    console.log(data)
    if (data.status == 200){
        this.infostatusget = false;
        this.infodetials = data;
        this.infoparceldetialstatus = true;
    }
    
},(error)=>{
  console.log(error)
  this.ErrorState = true;
})
}
//


//
Completedelivery(){
this.req.Completedelivery().subscribe((data: any) => {
    console.log("Complete delivery Post Working")
    console.log(data)
    if (data.status == 200) {
        this.infoparceldetialstatus = false;
        this.orderdeliverydetails();
        this.infodetials = data;
        this.infostatusid = true;
        this.infoparceldetialstatus = false;
    }
}, (error) => {
    this.error = error;
    this.ErrorState = true;
})
}
//

//
orderdeliverydetails(){
this.req.orderdeliverydetails().subscribe(data =>{
    console.log("getinfo resources working"+data)
    console.log(data)
    if (data.status == 200){
    this.infodata = data;
    }
},(error)=>{
  console.log(error)
  this.ErrorState = true;
})
}
   //
   orderdeliveredget(){
    this.req.orderdeliveredget().subscribe(data =>{
        console.log("Parcel Get working"+data)
        console.log(data)
        if (data.status == 200){
        this.infodetials = data;
        this.infostatusid = false;
        this.completdetails = true;
        }
    },(error)=>{
      console.log(error)
      this.ErrorState = true;
    })
  }
//





}

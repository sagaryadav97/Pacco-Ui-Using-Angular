import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpResponseBase, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html'
})
export class OrderComponent  implements OnInit {
    title = 'pacco-ui';
    error = null;
    ErrorState = false;
    orderstatusget = false;
    orderstatus = false;
    orderparceldetials = null;
    orderdata=null;
    orderdetials = null;
    orderparceldetialstatus = false;
    orderstatusid = false;
    token = localStorage.getItem('token')

    constructor(public toastr:ToastrService,public user: User, private req: DataService, private router: Router) {

    }
    ngOnInit() {
        this.parcelget();
    }

 //Parcels Section
 createorder(){
    this.req.createorder().subscribe((data: any) => {
        console.log("order Post Working")
        console.log("order Id"+localStorage.getItem("orderId"))
        if (data.status == 201) {
            this.orderstatusget = false;
            this.orderget();
            this.orderstatus = true;
            this.toastr.success("Order Created Successfully")
        }
    }, (error) => {
        this.error = error;
        this.ErrorState = true;
    })
}
//

//
orderget(){
this.req.getOrder().subscribe((data: any) =>{
    console.log("getOrder Get working"+data)
    console.log(data)
    if (data.status == 200) {
    this.orderdetials = data;
    }
},(error)=>{
  console.log(error)
  this.ErrorState = true;
})
}
//


//
addparcelorder(){
this.req.addparcelorder().subscribe((data: any) => {
    console.log("addparcelorder Post Working")
    console.log(data)
    if (data.status == 200){
        this.orderstatusget = false;
        this.orderidget();
        this.orderstatusid = true;
        this.orderstatus = false;
        this.toastr.success("parcel Added order success")
    }
}, (error) => {
    this.error = error;
    this.ErrorState = true;
})
}
//

//
orderidget(){
this.req.getorderbyid().subscribe((data: any) =>{
    console.log("get order by id working"+data)
    if (data.status == 200){
        console.log(data)
        this.orderdata = data;
    }
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
        this.orderdetials = data;
        this.orderstatusget = true;
    },(error)=>{
      console.log(error)
      this.ErrorState = true;
    })
  }
//





}

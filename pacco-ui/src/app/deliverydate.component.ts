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
    selector: 'app-deliverydate',
    templateUrl: './deliverydate.component.html'
})
export class DeliverydateComponent  implements OnInit {
    title = 'pacco-ui';
    error = null;
    ErrorState = false;
    deliveryinfostatusget = false;
    deliveryinfostatus = false;
    deliveryinfoparceldetials = null;
    deliveryinfodata=null;
    deliveryinfodetials = null;
    deliveryinfoget = false;
    deliveryinfostatusid = false;
    token = localStorage.getItem('token')

    constructor(public tsrs:ToastrService ,public vehile: Vehile, private req: DataService, private router: Router) {

    }
    ngOnInit() {
        this.deliveryinfostatus = true;

    }

 //Delivery date Section
 deliverydate(dates){
     console.log("working delivery data")
    this.req.deliverydate(dates).subscribe((data: any) => {
        console.log("delivery date Post Working"+data)
        if (data.status == 200) {
            this.deliveryinfostatusget = true;
            this.deliveryinfostatus = false;
            this.deliveryinfodetials = data;
            this.tsrs.success("Delivery Date Added Successfully ")
        }
    }, (error) => {
        this.error = error;
        this.ErrorState = true;
    })
}
//

//
priorityupdate(priority){
this.req.priorityupdate(priority).subscribe(data =>{
    console.log("priority update working"+data)
    console.log(data)
    if (data.status == 200){
        this.deliveryinfodata = data;
        this.deliveryinfoget = true;
        this.deliveryinfostatusget = false;
        this.deliveryget();
        this.tsrs.success("Priority Added Successfully ")

    }    
},(error)=>{
  console.log(error)
  this.ErrorState = true;
})
}
//


//
deliveryget(){
this.req.deliveryget().subscribe((data: any) => {
    console.log("Resource Get  Working")
    console.log(data)
    if (data.status == 200) {
        this.deliveryinfodetials = data;
    }
}, (error) => {
    this.error = error;
    this.ErrorState = true;
})
}
//

}

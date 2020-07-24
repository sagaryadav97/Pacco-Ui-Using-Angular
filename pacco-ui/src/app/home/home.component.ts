import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpResponseBase, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users = null;
  parcelId = null;
  userdet = false;
  ErrorState = false;
  orderstatus = false;
  percelstatus = false;
  percelstatusget = false;
  parceldetials = null;
  addressstatus = false;
  error = localStorage.getItem('token');
  token = localStorage.getItem('token');
  
  constructor(private toastr: ToastrService,public user: User,private req: DataService,private router:Router) {

     }
  ngOnInit() {
   this.orderstatus = true;
  }

  Userdetails(){
    this.req.getUser().subscribe((data:any) =>{
      this.users = data;
      this.userdet = true;
    },(error)=>{
      this.toastr.error(error.statusText)
      console.log(error)
    })
  }

  //
  order(){
    this.req.getUseraddress().subscribe((data: any) =>{
      console.log(data.state)
      console.log(data)
      if(data.state !== "valid"){       
      this.orderstatus = false;
      this.addressstatus = true;
      }else{
        this.router.navigate(['/parcel'])  
      }
    },(error)=>{
      this.toastr.error(error.statusText)
      console.log(error)
    })
  }
  //
//To Complete Registeration
adddaddress(form: NgForm){
    this.users = form.value
    this.req.address(form.value).subscribe((res: any)=>{
    console.log("Address Update"+res)
    if(res.status === 201){
      this.toastr.success("Address Updated Success")
      this.orderstatus = true;
      this.addressstatus = false;
      this.percelstatus = false;
      this.router.navigate(['/parcel'])
    }
  },(error)=>{
    this.toastr.error(error.statusText)
    console.log(error)
  })
  }
//End 

  logout(){
    localStorage.removeItem('token');
    this.toastr.success("Logout Success")
    this.router.navigate(['/login']);
  }
// 

 

  
  



}




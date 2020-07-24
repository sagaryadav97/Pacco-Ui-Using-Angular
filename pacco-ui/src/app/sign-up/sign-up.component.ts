import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { User } from  '../user';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
users = null;

  constructor(public user: User,private req: DataService,private toastr: ToastrService,private router:Router) {
    
   }


  ngOnInit(): void {
  }


  Register(form: NgForm){
    this.users = form.value;
    this.req.RegisterModel(form.value).subscribe((data:any) =>{
      if(data.status == 201){
        this.toastr.success("Account Created Successfully");
        this.router.navigate(['/login'])
      }
    },
    (error)=>{
      this.toastr.error(error.statusText);
      console.log(error)
    })
  }
}

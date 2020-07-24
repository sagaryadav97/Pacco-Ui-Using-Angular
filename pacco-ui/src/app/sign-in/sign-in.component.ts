import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  users = null;
  error = null;
  ErrorState = false;
    constructor(public user: User, private req: DataService,private toastr: ToastrService,private router:Router) {
      
     }
    
    ngOnInit(): void {
    }
  
    login(form: NgForm){
      this.users = form.value;
      this.req.LoginModel(form.value).subscribe(
        (data: any) => {
          if(data.status == 200){
            localStorage.setItem('token',data.body.accessToken)
            this.toastr.success("Login Success");
            this.router.navigate(['/Home'])
          }
     },
      (error)=>{
        this.toastr.error(error.statusText);
        console.log(error)
      })
    }

}

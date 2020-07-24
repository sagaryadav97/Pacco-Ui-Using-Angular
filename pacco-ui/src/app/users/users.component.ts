import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user = null;
  body = null;
  bodystatus = false;
  constructor(private req: DataService,private router:Router) {
      
  }
  token = localStorage.getItem('token')

ngOnInit() {


}

testing(){
 this.req.testing().subscribe((res) => {
  console.log(res)
  if(res.status === 200){
    this.bodystatus = true;
    this.body = res.body;
    if(this.body.userId){
      console.log(res.headers);
    }
    else{
      console.log("Testing not working");
    }  }
  this.user = res;
 },
 (err)=>{
   console.log(err);
 })
}

}

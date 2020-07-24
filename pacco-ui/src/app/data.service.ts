import { Injectable, } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpHandler } from '@angular/common/http'
import { User } from '../app/user'
import { from, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
user: User;
token  = localStorage.getItem('token');

tagsvalue = ["vehicle", "armor"];
url = "http://localhost:5000";

  constructor(private http: HttpClient) {
    
   }
   handlerError(error){
    return throwError(error || 'Server Error');
  }
  testing(){
    return this.http.get("https://jsonplaceholder.typicode.com/todos/1", {observe: 'response'}).pipe(
      map(res => {
        return res;
      }
    ))
  }
// Register Req
   RegisterModel(users){
     var datass = {
      email : users.email,
      password : users.password,
      role: users.role
    };
  const headers= new HttpHeaders()
  .set('content-type', 'text/plain');

   return this.http.post(this.url+"/identity/sign-up",datass,{headers,observe: 'response'}).pipe(
    map(res => {
      return res;
    },catchError(this.handlerError)));
   };
//end of req

// Login Req
   LoginModel(users){
    var datas = {
      email : users.email,
      password : users.password
    };
  const headers= new HttpHeaders()
  .set('content-type', 'text/plain');
    return this.http.post(this.url+"/identity/sign-in",datas,{headers,observe: 'response'}).pipe(
      map(res => {
        console.log(res.headers.getAll('Content-Type'))
        return res}),
        catchError(this.handlerError));
   };
//end of req

 // Get User Req 
   getUser(){
    const type1 = "application/x-www-form-urlencoded";
    let token  = localStorage.getItem('token');
    const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get(this.url+"/identity/me",{headers:heds})
    
    .pipe(map(res=>{
     return res
    }),catchError(this.handlerError))
   }
   //end of req

// Address Update Req
   address(users){
    var datas = {
      fullname : users.sname,
      address : users.address
    };
    let token  = localStorage.getItem('token');
    const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.post("http://localhost:5000/customers",datas,{headers:heds,observe: 'response'})
    .pipe(
      map(res => {
        console.log("working")
        console.log(res)
      return res}),
      catchError(this.handlerError));
   };
   // End of req

// Parcel Slection request
   parcels(users){
     console.log(this.token)
    var datas = {
      variant : users.variant,
      size : users.size,
      name : users.name,
      description : users.description
    };
    let token  = localStorage.getItem('token');
    const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.post("http://localhost:5000/parcels",datas,{headers:heds,observe: 'response'})
    .pipe(
      map((res:any) => {
      let parcelId = res.headers.get('Resource-ID');
      localStorage.setItem('parcelId',parcelId)
      return res
    }),
      catchError(this.handlerError));
   };
//end of percel req

//
getUseraddress(){
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get("http://localhost:5000/customers/me",{headers:heds,observe: 'response'})
    .pipe(map(res=>{
     return res
    }),catchError(this.handlerError))
   }
//

//
parcelget(){
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get("http://localhost:5000/parcels",{headers:heds,observe: 'response'})
    .pipe(map(res=>{
      return res}),
      catchError(this.handlerError))
   }
//

//
getvolume(){
 let token  = localStorage.getItem('token');
 let parceltoken  = localStorage.getItem('parcelId');
  const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get("http://localhost:5000/parcels/volume?parcelIds=['"+parceltoken+"']",{headers:heds,observe: 'response'})
    .pipe(map(res=>{
      return res}),
      catchError(this.handlerError))
   }
//
//
createorder(){
  var datas = {
   
  };
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .set("Content-Type","application/json")
  return this.http.post("http://localhost:5000/orders",datas,{headers:heds,observe: 'response'})
  .pipe(
    map((res:any) => {
    let orderId = res.headers.get('Resource-ID');
    localStorage.setItem('orderId',orderId)
    return res
  }),
    catchError(this.handlerError));
 };
//
//
getOrder(){
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get("http://localhost:5000/orders",{headers:heds})
    .pipe(map(res=>{
      return res}),
      catchError(this.handlerError))
   }
//

//
addparcelorder(){
  var datas = {
   
  };
  let token  = localStorage.getItem('token');
  let orderId  = localStorage.getItem('orderId');
  let parcelId  = localStorage.getItem('parcelId');

  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .set("Content-Type","application/json")
  return this.http.post("http://localhost:5000/orders/"+orderId+"/parcels/"+parcelId,datas,{headers:heds,observe: 'response'})
  .pipe(
    map((res:any) => {
    return res
  }),
    catchError(this.handlerError));
}

//
getorderbyid(){
  let token  = localStorage.getItem('token');
  let orderId  = localStorage.getItem('orderId');
  const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get("http://localhost:5000/orders"+orderId,{headers:heds})
    .pipe(map(res=>{
      return res}),
      catchError(this.handlerError))
   }
//
   Vehicleadd(users){
    console.log(this.token)
    var datas = {
    brand : users.brandtype,
    model : users.modeltype,
    description : users.description,
    payloadCapacity : users.payloadCapacity,
    loadingCapacity : users.loadingCapacity,
    pricePerService : users.pricePerService,
    variants : users.variants
   };
   let token  = localStorage.getItem('token');
   const heds = new HttpHeaders()
   .set('Authorization', `Bearer ${token}`)
   .set("Content-Type","application/json")
   return this.http.post("http://localhost:5000/vehicles",datas,{headers:heds,observe: 'response'})
   .pipe(
     map((res) => {
       console.log(res)
     let vehicleId = res.headers.get('Resource-ID');
     localStorage.setItem('vehicleId',vehicleId)
     return res
   }),
     catchError(this.handlerError));
  };
//
getvehicle(){
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get("http://localhost:5000/vehicles?payloadCapacity=0&loadingCapacity=0&variants=1",{headers:heds,observe: 'response'})
    .pipe(map(res=>{
      return res}),
      catchError(this.handlerError))
   }
//
vehicleavilable(){
  let ResourceID  = localStorage.getItem("vehicleId");
  var datas = {
    resourceId :  ResourceID,
    tags :  ["vehicle", "armor"]
  };
  console.log(datas)
  console.log(ResourceID)
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .set("Content-Type","application/json")
  return this.http.post("http://localhost:5000/availability/resources",datas,{headers:heds,observe: 'response'})
  .pipe(
    map((res:any) => {
    return res
  }),
    catchError(this.handlerError));
}
//
getvehicleresources(){
  var datas = {
    tags :  ["vehicle", "armor"]
  };
  
let token  = localStorage.getItem('token');
const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  return this.http.get("http://localhost:5000/availability/resources?tags=['vehicle', 'armor']&matchAllTags=false",{headers:heds,observe: 'response'})
  .pipe(map(res=>{
    return res}),
    catchError(this.handlerError))
 }
//
deliverydate(dates){
  let vehicleId  = localStorage.getItem('vehicleId');
  let orderId  = localStorage.getItem('orderId');
  localStorage.setItem('deliveryDate',dates)
  var datas = {
    deliveryDate: dates
  };
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .set("Content-Type","application/json")
  return this.http.post("http://localhost:5000/orders/"+orderId+"/vehicles/"+vehicleId,datas,{headers:heds,observe: 'response'})
  .pipe(
    map((res) => {
      console.log(res)
    return res
  }),
    catchError(this.handlerError));
}
//
priorityupdate(priorits){
  let ResourceID  = localStorage.getItem('vehicleId');
  let deliveryDate  = localStorage.getItem('deliveryDate');
  var datas = {
    priority: priorits
  };
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .set("Content-Type","application/json")
  return this.http.post("http://localhost:5000/availability/resources/"+ResourceID+"/reservations/"+deliveryDate,datas,{headers:heds,observe: 'response'})
  .pipe(
    map((res:any) => {
    return res
  }),
    catchError(this.handlerError));
}
//
deliveryget(){
  let token  = localStorage.getItem('token');
  let ResourceID  = localStorage.getItem('vehicleId');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  return this.http.get("http://localhost:5000/availability/resources/"+ResourceID,{headers:heds,observe: 'response'})
  .pipe(map(res=>{
    return res}),
    catchError(this.handlerError))
}
//
startdelivery(des){
  let orderId= localStorage.getItem('orderId');
  let deliveryDate  = localStorage.getItem('deliveryDate');
  var datas = {
    orderId: orderId,
    description: des,
    dateTime: deliveryDate
  };
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .set("Content-Type","application/json")
  return this.http.post("http://localhost:5000/deliveries",datas,{headers:heds,observe: 'response'})
  .pipe(
    map((res:any) => {
      let start_delivery = res.headers.get('Resource-ID');
      localStorage.setItem('start_delivery',start_delivery)
    return res
  }),
    catchError(this.handlerError));
}
//
transportationdetails(tes){
  let start_deliveryid= localStorage.getItem('start_delivery');
  let deliveryDate  = localStorage.getItem('deliveryDate');
  var datas = {
    id: start_deliveryid,
    description: tes,
    dateTime: deliveryDate
  };
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .set("Content-Type","application/json")
  return this.http.post("http://localhost:5000/deliveries/"+start_deliveryid+"/registrations",datas,{headers:heds,observe: 'response'})
  .pipe(
    map((res:any) => {
    return res
  }),
    catchError(this.handlerError));
}
//
Completedelivery(){
  let start_deliveryid= localStorage.getItem('start_delivery');
  var datas = {
    id: start_deliveryid
  };
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  .set("Content-Type","application/json")
  return this.http.post("http://localhost:5000/deliveries/"+start_deliveryid+"/complete",datas,{headers:heds,observe: 'response'})
  .pipe(
    map((res:any) => {
    return res
  }),
    catchError(this.handlerError));
}
//
orderdeliverydetails(){
  let start_deliveryid= localStorage.getItem('start_delivery');
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  return this.http.get("http://localhost:5000/deliveries/"+start_deliveryid,{headers:heds,observe: 'response'})
  .pipe(map(res=>{
    return res}),
    catchError(this.handlerError))
}
//
orderdeliveredget(){
  let orderId= localStorage.getItem('orderId');
  let token  = localStorage.getItem('token');
  const heds = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)
  return this.http.get("http://localhost:5000/orders/"+orderId,{headers:heds,observe: 'response'})
  .pipe(map(res=>{
    return res}),
    catchError(this.handlerError))
}
//

//

//

//

}
//


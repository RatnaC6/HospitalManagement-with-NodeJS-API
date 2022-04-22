import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IbookApt } from './ibook-apt';
import { Observable } from 'rxjs';
// import { BookAppointmentComponent } from './pages/patients/book-appointment/book-appointment.component';



@Injectable({
  providedIn: 'root'
})
export class SbookAptService {

  constructor(private httpClient : HttpClient) { }

  // THIS IS GET METHOD FOR DB
  getAllPatients() : Observable< IbookApt[]>{

    //return this.httpClient.get< IbookApt[]>("http://localhost:3000/api/appointment",

     return this.httpClient.get< IbookApt[]>("http://localhost:3000/book_appointment",

    {
      headers: {
        "Access-Control-Allow-Origin" : "*"
      }
    });
  }

  // THIS IS POST METHOD FOR DB
  addPatient(aptDetails : any){
    return this.httpClient.post("http://localhost:3000/api/appointment",aptDetails);
    
  }

  // addPatient(aptDetails : IbookApt){
  //   const headers ={'content-type':'application/json'};
  //   const body = JSON.stringify(aptDetails);
  //   return this.httpClient.post(this.baseURL+"/book_appointment",body,{'headers':headers});
    
  // }

  // THIS IS POST METHOD FOR DB
  // addPatient(aptDetails : any){
  //   const headers ={'content-type':'application/json'};
  //    const body = JSON.stringify(aptDetails);
  //   return this.httpClient.post("http://localhost:3000/book_appointment",body,{'headers':headers});
    
  // }

  // getsingleapointmentdata(id:any) {

  //   console.log(id)

  //   return this.http.get(this.baseURL+'/singledata/'+id);

  // }
}

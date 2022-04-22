import { Component, OnInit } from '@angular/core';
import { BookAppointmentComponent } from '../pages/patients/book-appointment/book-appointment.component';
import { Cpatients } from 'src/app/cpatients';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {

  patientDetails = {
    firstName : "",
    lastName : "",
    mobile_no : 0,
    doctorName: "",
    aptdate : "",
    apttime : ""
  };

  
  constructor(private bkApt : BookAppointmentComponent) { }

  ngOnInit(): void {
    this.patientDetails = this.bkApt.getAppointmentDetails();
  }
    
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SdoctorsService } from 'src/app/sdoctors.service';
import { Idoctors } from 'src/app/idoctors';
import { SbookAptService } from 'src/app/sbook-apt.service';
import { IbookApt } from 'src/app/ibook-apt';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  bookedApt! : IbookApt[];

  selectedSpeciality! : string;
  doctors : Idoctors[] = [];
   specDocs : string[] = [];
 
   bookAppointment = new FormGroup(
    {
      pFirstName : new FormControl(""),
      pLastName : new FormControl(""),
      gender : new FormControl(""),
      address : new FormControl(""),
      mobile : new FormControl(""),
      email : new FormControl(""),
      doctorName : new FormControl(""),
      speciality : new FormControl(""),
      aptdate : new FormControl(new Date()),
      apttime : new FormControl(new Date())
    }
  );
  
  patientDetails = {
    firstName : "",
    lastName : "",
    mobile_no : 0,
    doctorName: "",
    aptdate : "",
    apttime : ""
  };
  constructor(private docService : SdoctorsService, private book_apt : SbookAptService) { }

  ngOnInit(): void {
	  this.doctors = this.docService.getAllDocs();
  
    //THIS IS GET FUNCTION FOR DB
    this.book_apt.getAllPatients().subscribe((data)=> {
      this.bookedApt = data;
    });
  }
    // THIS IS POST FUNCTION FOR DB
    addPatient(){
      this.book_apt.addPatient(this.bookAppointment.value).subscribe((data) =>{
        console.log(data);
      });
      console.log(this.bookAppointment.value);
      this.showResponse();
    }

    // THIS IS SPECIFIC DOCTORS
 	 getSpecDoc() {
	  this.selectedSpeciality = this.bookAppointment.get("speciality")?.value;
    
    this.specDocs=this.docService.getDocBySpec(this.selectedSpeciality);
  }

  getAppointmentDetails(){
    this.patientDetails.firstName = this.bookAppointment.get("pFirstName")?.value;
      this.patientDetails.lastName = this.bookAppointment.get("pLastName")?.value;
      this.patientDetails.mobile_no = this.bookAppointment.get("mobile")?.value;
      this.patientDetails.doctorName = this.bookAppointment.get("doctorName")?.value;
      this.patientDetails.aptdate = this.bookAppointment.get("aptdate")?.value;
      this.patientDetails.apttime = this.bookAppointment.get("apttime")?.value;

      return this.patientDetails;
  }

  showResponse(){
    alert("Your appointment is booked successfully!\r\n"+"Your appointment details are:\r\n"
    +"First Name: "+this.bookAppointment.get("pFirstName")?.value+"\r\n"
    +"Last Name: "+this.bookAppointment.get("pLastName")?.value+"\r\n"
    +"Mobile No.: "+this.bookAppointment.get("mobile")?.value+"\r\n"
    +"Doctor Name: "+this.bookAppointment.get("doctorName")?.value+"\r\n"
    +"Appointment Date: "+this.bookAppointment.get("aptdate")?.value+"\r\n"
    +"Appointment Time: "+this.bookAppointment.get("apttime")?.value+"\r\n");
  }

}

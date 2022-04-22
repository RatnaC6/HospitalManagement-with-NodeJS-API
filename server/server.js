const promise = require("bluebird");
const initOptions ={
    promiseLib : promise
};

var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const pgp = require("pg-promise")(initOptions);

const cn = {
    host : 'localhost',
    port : 5432,
    database : 'Hospital',
    user : 'postgres',
    password : 'root',
    allowExitOnIdle : true
};

const db = pgp(cn);

const express = require("express");
const cors = require("cors");
// const { ParameterizedQuery } = require("pg-promise");
const server = express();
const port = 3000;

server.use(cors());

var bookedApt = null;

db.many("select * from book_appointment;")
.then((data)=>{
    this.bookedApt = data;
}).catch((error)=>{
    console.log("error:  "+error);
});

// var postApt= req.body.b;

// db.none(`insert into book_appointment (first_name, last_name, gender, address, 
//     mobile_no, email, doctor_name, speciality, appointement_date, appointement_time)values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`),
    
//     [
//         req.body.first_name,
//         req.body.last_name,
//         req.body.gender,
//         req.body.address,
//         req.body.mobile_no,
//         req.body.email,
//         req.body.doctor_name,
//         req.body.speciality,
//         req.body.appointement_date,
//         req.body.appointement_time
        
//       ]);




server.get("/book_appointment", (req, res)=>{
    res.setHeader("content-type", "application/json");
    res.send(this.bookedApt);
});

server.post('/book_appointment',  (req, res) => { 
    // db.none(`INSERT INTO Book_Appointment( First_Name,Last_Name, Gender,Address,Mobile_No,Email,Doctor_Name,Speciality,Appointement_Date,Appointement_Time)
    // VALUES('Ramesh','Parihar','Male','Bhakti appt.Virar west',9545899348,'ramesh@gmail.com','Manisha Pandey','Arthology','05-08-2022','8:30');`) 
      
   

// Creating a reusable Parameterized Query without values:
// const addUser = new ParameterizedQuery('INSERT INTO Book_Appointment( First_Name,Last_Name, Gender,Address,Mobile_No,Email,Doctor_Name,Speciality,Appointement_Date,Appointement_Time) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)');
// addUser.values = [
//     req.body.first_name,
//     req.body.last_name,
//     req.body.gender,
//     req.body.address,
//     req.body.mobile_no,
//     req.body.email,
//     req.body.doctor_name,
//     req.body.speciality,
//     req.body.appointement_date,
//     req.body.appointement_time

// OR

// req.body.pFirstName,
                // req.body.pLastName,
                // req.body.gender,
                // req.body.address,
                // req.body.mobile,
                // req.body.email,
                // req.body.doctorName,
                // req.body.speciality,
                // req.body.aptdate,
                // req.body.apttime
// ] ; 
    db.none(
      
        `insert into book_appointment( first_name,last_name, gender,address,mobile_no, email, doctor_name, speciality, appointment_date, appointment_time)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,
        [
                req.body.pFirstName,
                req.body.pLastName,
                req.body.gender,
                req.body.address,
                req.body.mobile,
                req.body.email,
                req.body.doctorName,
                req.body.speciality,
                req.body.aptdate,
                req.body.apttime
        ]  
        // `INSERT INTO bkapt (appointment) values ('{"First_Name":"req.body.pFirstName","last_name":"req.body.pLastName", "gender":"req.body.gender","address":"req.body.address","mobile_no":"req.body.mobile","email":"req.body.email","doctor_name":"req.body.doctorName","speciality":"req.body.speciality","appointment_date":"req.body.aptdate","appointment_time":"req.body.apttime"})`
       ).then( d => {
            console.log(d);
        });

        res.sendStatus(200);
    }); 
    // var statement = `INSERT INTO Book_Appointment( First_Name,Last_Name, 
    //                 Gender,Address,Mobile_No,Email,Doctor_Name,Speciality,Appointement_Date,Appointement_Time) 
    //                 VALUES (${req.body.first_name},${req.body.last_name},${req.body.gender},${req.body.address},
    //                         ${req.body.mobile_no},${req.body.email},${req.body.doctor_name}
    //                         ,${req.body.speciality},${req.body.appointement_date},${req.body.appointement_time});`;
//     var statement = "INSERT INTO Book_Appointment( First_Name,Last_Name, "+ "Gender,Address,Mobile_No,Email,Doctor_Name,Speciality,Appointement_Date"+
// ",Appointement_Time) VALUES ("+req.body.first_name+","+req.body.last_name+","+req.body.gender+","+req.body.address+","+req.body.mobile_no+","
// +req.body.email+","+req.body.doctor_name+","+req.body.speciality+","+req.body.appointement_date+","+req.body.appointement_time+");"   
    
//          db.none(statement ).then( d => {
//               console.log(d);
//           });

//           res.sendStatus(200);

//  });

server.listen(port, ()=>
{
    console.log("server started");
});
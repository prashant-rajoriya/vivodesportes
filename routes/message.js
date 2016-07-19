var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var msg91=require('msg91-sms');
var mail;
var authkey='';
//for multiple numbers
// var numbers=[];
// numbers.push('');
//for single number
var number='';
//message
var message='';
//Sender ID
var senderid='';
//Route
var route='';
//Country dial code
var dialcode='';

//-----------------------------------------------------------SMTP-SERVER---------------------------------------------------------------//

//Set Server
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "dicesimon123@gmail.com",
        pass: "qwertypad"
    }
});

//-----------------------------------------------------APIs---------------------------------------------------------------------------//


//GET : To Send Mail and SMS
//if null -> {data:"not found any data"}
router.get('/',function(req,res){
  if(req.body !== null)
    sendTomm(req,res);
  else {
    return res.json({data:"not found any data"});
  }
});

//-----------------------------------------------------FUNCTIONS--------------------------------------------------------------------//

//Function: Send SMS
function sendSms(req,res){
  msg91.sendOne(authkey,number,message,senderid,route,dialcode,function(response){
    res.json({data:"send"});
  });
}

//Function: Send Email
function sendTomm(req,res){
  mail = {
    to: "201301087@daiict.ac.in",
    subject : "Vivodesportes:"+req.body.fname+"is instreated and hear are some datials",
    html:"<br> name : "+req.body.fname+" "+req.body.lname+"<br> email : "+req.body.eMail+"<br> phone : "+req.body.phone
  };

  smtpTransport.sendMail(mail,function(err,responce){
    if(err) return console.error(err+"error in sendTomm");
    else console.log("Done!!!");
  });
}

//--------------------------------------------------------END------------------------------------------------------------------------//

module.exports = router;

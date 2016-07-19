var express = require('express');
var router = express.Router();
var passport = require('passport');
var nodemailer = require("nodemailer");
var md5 = require('MD5');
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Player = mongoose.model('Player');

/**
 * login function for backend testing
 * @param  {req,res}
 * @param  {/}
 * @return {login page}
 */
router.get('/',function(req,res) {
  if(req.isAuthenticated())
    res.redirect('/');
  else
    res.render('login');
});



/**
 * login post request
 * @param {url} [/]
 */
router.post('/login',
  passport.authenticate('login', {
    successRedirect: '/api/login/a', //can be player profile
    failureRedirect: '/api/login/b', //can be login page
    failureFlash: false })
);

router.post('/fb',passport.authenticate('facebook',{
  successRedirect: '/api/login/cfb',//some new random page
  failureRedirect: '/api/login/b'
}));

router.get('/cfb',function(req,res){
    var p1 = new Player();
    p1.username=req.body.username;
    p1.password=createHash(req.body.password);
    p1.email=req.user._json.email;
    p1.active = 1;
    p1.f_name = req.user._json.first_name;
    p1.l_name = req.user._json.last_name;
    rand= md5(req.body.username+new Date());
    p1.verifyhash=rand;
  p1.save(function (err, p1) {
  if (err) return req.json({error:"Problem in Database. Try Again later."});
  });
});

router.get('/a', function(req,res) {
  res.json({msg:"suc"});
});
router.get('/b', function(req,res) {
  res.json({msg:"err",error:"Incorrect username/password"});
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/index.html');
});

/**
 * [Options for mailing]
 */
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "dicesimon123@gmail.com",
        pass: "qwertypad"
    }
});
var rand,mailOptions,host,link;

/**
 * forgot password function
 */
router.post('/forgot', function(req, res) {
    rand= md5(req.body.email+new Date());
    Player.findOne({ email: req.body.email }, function (err, user) {
       if (err){ console.log("1");
       return res.json({error:"email dosen't exist"});
       }
        if(user){
          user.forgothash=rand;
          user.save();
        }
    });
    console.log(req.body);
    host=req.get('host');
    link="http://localhost:3000/api/login/verifyforgot?id="+rand;
    mailOptions={
    to : req.body.email,
    subject : "Request for Password change",
    html : "Hello,<br> Please Click on the link to change your password.<br><a href="+link+">Click here to verify</a>"
    };
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
    console.log("verifyforgot");
        console.log(error);
        res.send({email:"email"});
    }else{
        console.log("Message sent: " + response.message);
        res.json({message:"sent"});
     }
    });

});


/*
funcition for verifying forgot password
 */
router.get('/verifyforgot',function(req,res){
  host=req.get('host');

    Player.findOne({ forgothash: req.query.id }, function (err, user) {
      if(err){ return res.json({error:"Your email time is expired. Please request reset password again!!"});}
      if(user){
        res.redirect('/html/ResetPassword.html?id='+req.query.id);
      }

    });
    //res.send('error');
});

router.post('/reset',function(req,res) {
  var id = req.body.id;
  var pass = md5(req.body.password);
  console.log(req.body);
  Player.findOne({ forgothash: id }, function (err, user) {
    if(err){return res.json({error:"Your email time is expired. Please request reset password again!!"});}
    if(user){
      user.password = pass;
      user.save();
      console.log(user);
      res.redirect('/html/login.html');
    }
  });
});

module.exports = router;

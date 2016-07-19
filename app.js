var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Passport = require('./passport/init');
var mongo = require('mongodb');
var nodemailer = require('nodemailer');
var multer = require('multer');
var flash = require('connect-flash');

require('./models/player');
require('./models/tournaments');
require('./models/playerVideos');
require('./models/blog');
require('./models/career');
require('./models/aboutUs');
require('./models/employees');
try {
  mongoose.connect('mongodb://localhost:27017/test');
}
catch(e){
  console.log("error connecting database: "+e);
}

var player = require('./routes/player');
// var admin = require('./routes/admin/admin');
var search = require('./routes/search');
var login = require('./routes/login');
var register = require('./routes/register');
var tournaments = require('./routes/tournaments');
var profile = require('./routes/profile');
var career = require('./routes/admin/career');
var aboutUs = require('./routes/aboutUs');
var blog = require('./routes/admin/blog');
var videos = require('./routes/videos');


var Player = mongoose.model('Player');

var app = express();

app.locals.moment = require('moment');

app.locals.truncateText= function (text,length) {
    var truncateText = text.substring(0,length);
    return truncateText;
}


//Handle file uploads & Multipart data
var upload=multer({dest: './public/image/uploads'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'football is not square',
  resave: true,
  saveUninitialized: true,
  cookie :{ }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

//Express - Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root    = namespace.shift(),
            formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));


app.use('/api/player', player);
// app.use('/api/admin',admin);
app.use('/api/search',search);
app.use('/api/login',login);
app.use('/api/register',register);
app.use('/api/tournaments',tournaments);
app.use('/api/profile',profile);
app.use('/blog',blog);
app.use('/career',career);
app.use('/videos',videos);
app.use('/aboutUs' , aboutUs);

app.use(flash());
app.use(function (req,res,next) {
    res.locals.messages = require('express-messages')(req,res);
    next();
});

//Make our db accessible to our router



app.get('/api/auth',function(req,res){
  if(req.user){
    var e = req.user.active;
    var email;
    if(e==1)  email = true;
    else email = false;
    res.json({name:req.user.f_name,username:req.user.username,status:"online",verified:email});
  }
  else{
    res.json({status:"offline"});
  }

});

app.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

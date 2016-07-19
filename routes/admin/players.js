var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//--------------------------------------------APIs------------------------------------------------------------------------------------//

// going on passport/init and check adminlogin function
router.post('/login',
    passport.authenticate('adminlogin', {
        successRedirect: '/admin/admin.html',
        failureRedirect: '/admin/login.html',
        failureFlash: false
    })
);

//Check Role for entring admin site
router.get('/', function(req, res, next) {
    if (req.user.admin === true) {
        res.redirect("/admin/login.html"); //if admin is log in to the site it will autometically log on to admin site
    } else {
        res.redirect("/html/index.html"); //not admin can go to admin log in page
    }
});

//Geting player data
router.get('/',lc,function(req, res, next) {
    var seek = parseInt(req.query.seek);
    console.log("seek " + seek);
    Player.find(function(err, players) {
        if (err) {
            return next(err);
        }
        res.json(players);
    }).skip(seek).limit(9);
});

//Search

/**
 * Function for ensuring that user is logged in
 * @param  {req,res,next}
 * @return {next function}
 */


//For adding players
router.post('/add',lc,function(req, res) {
    var add = new Player();
    add.username = req.body.username;
    add.email = req.body.email;
    add.password = req.body.password;
    add.f_name = req.body.f_name;
    add.l_name = req.body.l_name;
    add.bdate = req.body.bdate;
    add.contact = req.body.contact;
    add.role = req.body.role;
    add.fav_footballer = req.body.fav_footballer;
    add.fav_club = req.body.fav_club;
    add.pre_foot = req.body.pre_foot;
    //add.requestVerify = req.body.requestVerify;
    //add.verifyed = req.body.verifyed;

    add.save(function(err, add) {
        if (err) return console.error(err);
        console.log("New Player ADDED!");
        res.json(add);
    });
});

//for Approval of player's live skill testing
router.get('/approval', function(req, res) {
    var search = req.query.requestVerify;
    //can Change hear only use for searching user's first name
    Player.find({
        requestVerify: true
    }, function(err, players) {
        if (err) {
            return res.send("something Went Wrong!!! Try Again!!!");
        }
        res.json(players);
    });
});

//for checking username at regestration time
router.get('/euname', function(req, res){
    var search = req.query.username;
    Player.find({username: new RegExp('^' + search, "i")}, function(err, uname){
        if (uname)
            return res.send("This Name is Taken! Try New!");
        if (err)
            return res.send("fakeuname function Error!!!");
    });
   return res.send("All done!!");
});
//for checking Email
router.get('/eename', function(req, res){
    var search = req.query.email;
    Player.find({
        email: new RegExp('^' + search, "i")
    }, function(err, uname) {
        if (uname)
            return res.send("Your Email is already registered!!!Plz Tre Forget Password!!");
        if (err)
            return res.send("fakeuname function Error!!!");
    });
    return res.send("All done!!");
});


//Edit profile
router.post('/editprofile',lc,function(req, res) {
    console.log(req.body);
    Player.findOne({
        username: req.body.username
    }, function(err, data) {
        if (err) {
            return res.json({
                error: "database error"
            });
        }
        if (data) {
            data.f_name = req.body.f_name;
            data.l_name = req.body.l_name;
            data.email = req.body.email;
            data.bdate = req.body.bday;
            data.contact = req.body.contact;
            data.fav_footballer = req.body.fav_footballer;
            data.fav_club = req.body.fav_club;
            data.pre_foot = req.body.pre_foot;
            data.save(function(err,data){
                res.json({
                    msg: "profile updated!!"
                },data);
            }); 
        }
    });
});

//Delete the profile
router.post('/delete',lc,function(req, res) {
    Player.findById(req.query.id, function(err, player) {
        if (err) {
            return console.log("error in delete stg!!");
        }
        Player.remove({
            _id: player.id
        }); //Removes the requested player
    });
});

//------------------------------------FUNCTIONS--------------------------------------------------------------------------------------//

//FUNCTION FOR CHECKING AUTHENTICATION

function lc(req, res, next) {
    if (req.isAuthenticated() && req.user.admin === true)
        return next();
    else {
        res.json({
            error: "please login"
        });
        res.redirect('/html/login.htm');
    }
}

module.exports = router;

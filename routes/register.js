var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var md5 = require('MD5');
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var fs = require('fs');

var text1 = fs.readFileSync('./Email/html1.html');
var text2 = fs.readFileSync('./Email/html2.html');

router.get('/test', function(req, res) {
    Player.findOne({}, function(err, data) {
        if (err) return console.log("sdafsadfasf");
        res.json(data);
    })
})


var createHash = function(password) {
    return md5(password);
};


/**
 * For registoring user
 * @param  {req}
 * @param  {res}
 * @param  {/}
 * @return {json data}
 */
router.post('/', function(req, res) {
    console.log(req.body);
    Player.findOne({
        $or: [{
            username: req.body.username
        }, {
            email: req.body.email
        }]
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            if (user.email == req.body.email)
                res.json({
                    error: "email"
                });
            else
                res.json({
                    error: "username"
                });
            return;
        }
        //console.log("createuser");
        else {
            createUser(req, res);

        }
    });

});

/*
veryfing email of register user
 */
router.get('/verify', function(req, res) {
    Player.findOne({
        verifyhash: req.query.id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            user.active = 1;
            user.save();
            return res.redirect('/html/login.html');
        }
        res.redirect('/html/login.html');
    });
});

/**
 * For creating user from given data
 * @param  {req}
 * @param  {res}
 * @return {json data}
 */

function createUser(req, res) {
    console.log(req.body);
    var p1 = new Player();
    p1.username = req.body.username;
    p1.password = createHash(req.body.password);
    p1.email = req.body.email;
    p1.active = 0;
    p1.f_name = req.body.f_name;
    p1.l_name = req.body.l_name;
    p1.admin = false;
    p1.bdate = req.body.bdate;
    p1.contact = req.body.contact;
    rand = md5(req.body.username + new Date());
    p1.verifyhash = rand;
    p1.save(function(err, p1) {
        if (err) return req.json({
            error: "Problem in Database. Try Again later."
        });
        console.log("saved");
    });
    console.log("testmail");
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dicesimon123@gmail.com',
            pass: 'qwertypad'

            // user: 'register.vivodesportes@gmail.com',
            // pass: 'ilivesports'

        }
    });
    var rand, mailOptions, host, link;

    host = req.get('host');
    console.log('host');
    link = "http://" + host + "/api/register/verify?id=" + rand;

    mailOptions = {
        from: 'VivoDesportes<dicesimon123@gmail.com>',
        to: req.body.email,
        subject: "Please confirm your Email account",
        //html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a><br>You will be redirected to login page.",
        html:text1+link+text2
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.json({
                error: "Error in sending email. Please contact administrator of the site"
            });
            res.redirect('/');
        } else {
            console.log("Message sent: " + info.response);
            res.redirect('/');
        }
    });
    //res.json({msg:"success"});
}

module.exports = router;

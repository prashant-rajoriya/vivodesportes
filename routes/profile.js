var express = require('express');
var router = express.Router();
var md5 = require('MD5');
var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, req.user.username + ".jpg");
    }
});
var upload = multer({
    storage: storage
});

/*
Get profile details of logged in user
 */
router.get('/',lc, function(req, res) {
    Player.findOne({
        username: req.user.username
    }, function(err, p) {
        if (err) {
            return res.json({
                error: "database error"
            });
        }
        if (p) {
            res.json(p);//it will return _id
        }
    }).select({
        verifyhash: 0,
        password: 0
    });
});

//to fatch data for all users

router.get('/view',function(req,res){
    Player.findById(req.query.id,function(err,data){
        if(err){
            return res.json({error:"Requested id not found in database"});
        }

        res.json(data);

    }).select({
        verifyhash: 0,
        password: 0,
        active: 0,
        admin:0
    });
});

/*
update profile of logged in user
 */
router.post('/',lc, function(req, res) {

    Player.findOne({
        username: req.user.username
    }, function(err, p) {
        if (err) {
            return res.json({
                error: "database error"
            });
        }
        if (p) {
            p.f_name = req.body.f_name;
            p.l_name = req.body.l_name;
            p.email = req.body.email;
            p.bdate = req.body.bday;
            p.contact = req.body.contact;
            p.fav_footballer = req.body.fav_footballer;
            p.fav_club = req.body.fav_club;
            p.pre_foot = req.body.pre_foot;
            p.save(function(err,data){
              if(err) console.log(err);
              else console.log(data);
            });
            res.json({msg: "profile updated!!",p});
        }
    });

});

/*
get profile pic of logged in user
 */
router.get('/pic',function(req, res) {
    var get = req.query.name;

    var fs = require('fs'),
        path = 'public/uploads/' + get + '.jpg';
    fs.exists(path, function(exists) {
        if (exists) {

            return res.redirect('/uploads/' + get + '.jpg');
        }

        return res.redirect('/uploads/none.jpg');
    });
});


/*
Remove profile pic of logged in user
 */
router.get('/picrm',lc, function(req, res) {
    var fs = require('fs'),
        path = 'public/uploads/' + req.user.username + '.jpg';
    fs.exists(path, function(exists) {
        if (exists) {
            fs.unlink(path);
        }
    });
    res.redirect(req.headers('referer'));
});

/*
Change profile pic of logged in user
 */
router.post('/pic',lc, function(req, res) {
    upload.single('image')(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
            return res.send(err);
        }
        res.redirect(req.headers('referer'));
    });
});


/*
update skills of logged in user
 */
router.post('/skills', function(req, res) {
   skills(req,res);
});

/*
update passeword of logged in user
 */
router.post('/pass',lc, function(req, res) {
    var oldpass = req.body.password;
    var newpass = req.body.newpass;
    Player.findOne({
        username: req.user.username
    }, function(err, p) {
        if (err) {
            return res.json({
                error: "database error"
            });
        }
        if (p) {

            if (p.password != createHash(oldpass)) {
                return res.json({
                    error: "Wrong current password"
                });
            } else {
                p.password = createHash(newpass);
                p.save();
                res.json({
                    msg: "password changed!!"
                });
            }
        }
    });
});

/*
request for rating to vivo desportes
 */
router.get('/getrated',lc, function(req, res) {

    Player.findOne({
        username: req.user.username
    }, function(err, player) {
        if (err) {} else if (player) {
            if (player.requestVerify) {
                res.json({
                    error: "Already applied for Verification!"
                });
            } else {
                player.requestVerify = true;
                res.json({
                    msg: "Verification request sent!"
                });
            }
            player.save();
        }
    });
});

function skills(req,res){
    Player.findById("578e1e13c44c276420cd5cbf",function(err,data){
        var acceleration = req.body.acceleration;
        data.skills.acc_rate = Math.min(Math.round((3.84 / (acceleration * acceleration)) * 100), 95);
        data.skills.agi_rate = Math.min(Math.round((req.body.agility / 6.35) * 100), 95);
        data.skills.jump_rate = Math.min(Math.round(req.body.jumping * 100 / 80), 95);
        data.skills.sprint_rate = Math.min(Math.round(req.body.sprintspeed * 100 / 34.7), 95);
        data.skills.stamina_rate = Math.min(Math.round(req.body.stamina * 100 / 13.6), 95);
        data.skills.Stren_rate = Math.min(Math.round(req.body.strength), 95);
        data.skills.ballcont_rate = Math.min(Math.round(((0.25 - ((req.body.grounded_pass - 1) * 0.05)) + (0.25 - ((req.body.grounded_cross - 1) * 0.05)) + (0.25 - ((req.body.chipped_pass - 1) * 0.05)) + (0.25 - ((req.body.aerial_through - 1) * 0.05))) * 100), 95);
        data.skills.longpass_rate = Math.min(Math.round(req.body.longpassing * 10), 95);
        data.skills.cross_rate = Math.min(Math.round((data.skills.longpass_rate + req.body.crossing * 10) / 2), 95);
        var dribbling = req.body.dribbling;
        if (dribbling <= 5)
            data.skills.drib_rate = Math.round(dribbling * 7);
        else if (dribbling <= 10)
            data.skills.drib_rate = Math.round(35 + (dribbling - 5) * 10);
        else if (dribbling == 11)
            data.skills.drib_rate = 91;
        else if (dribbling == 12)
            data.skills.drib_rate = 92;
        else if (dribbling == 13)
            data.skills.drib_rate = 93;
        else if (dribbling == 14)
            data.skills.drib_rate = 94;
        else if (dribbling >= 15)
            data.skills.drib_rate = 95;
        data.skills.finish_rate = Math.min(Math.round((req.body.Finishing_score + ((req.body.finishing_shots - req.body.Finishing_score) * 0.6) * 10)), 95);
        data.skills.shortpass_rate = Math.min((Math.round(req.body.short_passing / 84) * 100), 95);
        data.skills.head_rate = Math.min(Math.round((req.body.header_score + ((req.body.header_ontarget - req.body.header_score) * 0.6) * 10)), 95);
        data.skills.penalty_rate = Math.min(Math.round((req.body.penalties_score / req.body.penalties_attempt) * 100), 95);
        data.skills.shotpower_rate = Math.min(Math.round((req.body.shotpower / 70) * 100), 95);
        data.skills.defend_rate = Math.min(Math.round((req.body.success_tackle * 1.2) + (req.body.unsuccess_tackle * 0.2) + (req.body.fouls_commit * -0.2) * 10), 95);

        //data.rating = Math.round((data.skills.acc_rate + data.skills.agi_rate + data.skills.jump_rate + data.skills.sprint_rate + data.skills.stamina_rate + data.skills.Stren_rate + data.skills.ballcont_rate + data.skills.longpass_rate + data.skills.cross_rate + data.skills.drib_rate + data.skills.finish_rate + data.skills.shortpass_rate + data.skills.head_rate + data.skills.penalty_rate + shotpower_rate + data.skills.defend_rate) / 16);
        data.save(function(err,data){
            if (err) {return res.json({data:"Error Saving data for skills"});}
            var c =0;
            var dataNew = Object.assign({},data.skills._doc.skills);
            for(key in dataNew){
              if(dataNew.hasOwnProperty(key)){
                c+=a(dataNew[key]);
              }
            }
            data.rating = (data.skills.acc_rate+
            data.skills.agi_rate+
            data.skills.jump_rate+
            data.skills.sprint_rate+
            data.skills.stamina_rate+
            data.skills.Stren_rate+
            data.skills.ballcont_rate+
            data.skills.longpass_rate+
            data.skills.cross_rate+
            data.skills.drib_rate+
            data.skills.finish_rate+
            data.skills.shortpass_rate+
            data.skills.head_rate+
            data.skills.penalty_rate+
            data.skills.shotpower_rate+
            data.skills.defend_rate)/c;

            data.save(function(err,p){
              res.json(p);
            })
            //res.json(p);
        });
    });
}

function a(val){
  if(val==0) return 0;
  return 1;
}

/**
 * ensure authentication of user
 * @param  {req}
 * @param  {red}
 * @param  {next}
 * @return {json}
 */
function lc(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else {
        res.json({
            error: "please login"
        });
    }
}
/**
 * creates md5 hash of given string
 * @param  {String}
 * @return {String}
 */
function createHash(password) {
    return md5(password);
}

module.exports = router;

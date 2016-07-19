var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tournament = mongoose.model('Tournament');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser'); //parses information from POST

var moment = require('moment');

var multer = require('multer');

// var upload = multer();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,  +' '+Date.now()+".jpg");
  }
});
var upload = multer({storage: storage});
//

//method override function
router.use(bodyParser.urlencoded({ extended: true }));




/* GET home page. */
/*
	Get Request for /api/admin
	return login page if not logged in or
 */

// router.get('/',ensureAuthenticated,function(req, res, next) {
// 	if(req.user.role=="admin"){
// 		res.redirect("/admin/admin.html");
// 	}
// 	else{
// 		res.redirect("/admin/login.html");
// 	}
// });



// router.post('/login',passport.authenticate('adminlogin', { successRedirect: '/admin/admin.html',
//                                    failureRedirect: '/admin/login.html',
//                                    failureFlash: false })
// );


/**
 * For adding tournaments
 * @param  {url api/admin/tournament}
 * @return {stored tournament object}
 */
router.post('/tournaments',upload.fields([{ name: 'fix', maxCount: 1 },{ name: 'banner', maxCount: 1 }]),function(req,res) {
	console.log(req.body);
	var t1 = new Tournament();
	t1.name=req.body.name;
	t1.location=req.body.location;
	t1.description=req.body.description;
	t1.format=req.body.format;
	t1.type=req.body.type;
	t1.date=req.body.date;
	t1.closedate=req.body.closedate;
	t1.formattedDate = moment(t1.date).format('YYYY-MM-DD');
	t1.closeformattedDate = moment(t1.closedate).format('YYYY-MM-DD');
	t1.status = req.body.status;
	var feature = req.body.feature.split('#');
	var rules= req.body.rules.split('#');
	t1.feature = feature;
	t1.rules = rules;


	console.log(req.files);

	// if(req.files.fix) {
		t1.fix = req.files.fix && req.files.fix[0].path.replace("public/","");
		t1.banner = req.files.banner && req.files.banner[0].path.replace("public/","");
// } else {
// 	t1.fix = 'image/uploads/no_image.png';
// 	t1.banner = 'image/uno_image.png';
// }

	if(req.files.fix){
		console.log("uploading file fix...");
			//Image info
			var fixOriginalName = req.files.fix[0].originalname;
			var fixName = req.files.fix[0].name;
			var fixMime = req.files.fix[0].mimetype;
			var fixPath = req.files.fix[0].path;
			var fixExt = req.files.fix[0].extension;
			var fixSize = req.files.fix[0].size;

		}else{
			//set as default image
			var fixName = "noImage.png";

		}

	if(req.files.banner){
	console.log("uploading file banner...");
		//Image info
		var bannerOriginalName = req.files.banner[0].originalname;
		var bannerName = req.files.banner[0].name;
		var bannerMime = req.files.banner[0].mimetype;
		var bannerPath = req.files.banner[0].path;
		var bannerExt = req.files.banner[0].extension;
		var bannerSize = req.files.banner[0].size;

	}else{
		//set as default image
		var bannerName = "noImage.png";

	}

	t1.save(function (err, t1) {
		if (err) return console.error(err);
		console.log("stored successfully");
		res.redirect("/api/admin/tourn_view");
	});

});
// View Tournaments

//edit

router.get('/tourn_view', function(req, res, next){
	res.render('tourn_view')
})

//Edit Tournaments
//getting information on form
router.get('/tourn_edit' , function(req , res , next){
	var id = req.query.edit
	Tournament.findById(id).exec(function(err, tournament) {
    if (err) {
      return next(err);
    }
    else {
    	console.log(tournament)
      res.render('tourn_edit', { tournament : tournament });
    }
  });

});
//updating the form in database
router.post('/tourn_edit',upload.fields([{ name: 'fix', maxCount: 1 },{ name: 'banner', maxCount: 1 }]), function(req,res) {
	var id = req.body.id
		console.log(id)
	Tournament.findById(id).exec(function(err, t1){
		if(err) {
			throw new Error(err);
		}
		console.log(t1)
		t1.name=req.body.name;
		t1.location=req.body.location;
		t1.description=req.body.description;
		t1.format=req.body.format;
		t1.type=req.body.type;
		t1.date=req.body.date;
		t1.closedate=req.body.closedate;
		t1.formattedDate = moment(t1.date).format('YYYY-MM-DD');
		t1.closeformattedDate = moment(t1.closedate).format('YYYY-MM-DD');
		t1.status = req.body.status;
		var feature = req.body.feature.split('#');
		var rules= req.body.rules.split('#');
		t1.feature = feature;
		t1.rules = rules;
		t1.fid = req.body.fid;
		t1.fix = (req.files.fix) ? req.files.fix[0].path.replace("public/","") : t1.fix;
		t1.banner = (req.files.banner) ? req.files.banner[0].path.replace("public/","") : t1.banner;

		console.log(req.files.fix);

	if(req.files.fix){
		console.log("uploading file fix...");
			//Image info
			var fixOriginalName = req.files.fix[0].originalname;
			var fixName = req.files.fix[0].name;
			var fixMime = req.files.fix[0].mimetype;
			var fixPath = req.files.fix[0].path;
			var fixExt = req.files.fix[0].extension;
			var fixSize = req.files.fix[0].size;

		}else{
			//set as default image
			var fixName = "noImage.png";

		}

	if(req.files.banner){
	console.log("uploading file banner...");
		//Image info
		var bannerOriginalName = req.files.banner[0].originalname;
		var bannerName = req.files.banner[0].name;
		var bannerMime = req.files.banner[0].mimetype;
		var bannerPath = req.files.banner[0].path;
		var bannerExt = req.files.banner[0].extension;
		var bannerSize = req.files.banner[0].size;

	}else{
		//set as default image
		var bannerName = "noImage.png";

	}

		t1.save(function (err, t2) {
			if (err) return console.error(err);
			console.log("updated successfully");
		});

		});

		res.redirect("/api/admin/tourn_view");
	})

//Delete Tournament from database
router.post('/delete' , function(req , res , next){

	var id = req.body.delete
	console.log(id)


	Tournament.findByIdAndRemove(id ,function(err, tournament) {
    if (err) {
    	return next(err);
    }
    else {
    	console.log(req.body.fix)
    	console.log(req.body.banner)
    	console.log(tournament)
      res.redirect('tourn_view');
    }
  });

});




/**
 * Function for ensuring that usre is logged in
 * @param  {req,res,next}
 * @return {next function}
*/
/*
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated(adminLogin))
    return next();
  else{
    res.json({error:"please login"});
  }


}
*/





module.exports = router;

var express = require('express');
var router = express.Router();
var videos = require('../models/playerVideos');
var playerVideo = videos.playerVideo;
var addAndUpdate = videos.addAndUpdate;
var mongoose = require('mongoose');
var vs = mongoose.model('vs');

router.get('/skills', function(req, res) {
  var id = req.query.id;
  vs.find({"vidCategory": id}, function(err, data) {
    res.render('skill', { id, data });
  });
});

router.post('/edit', function(req, res) {
  var id = req.query.id;
  vs.find( {vidCategory: id}, {vidLink: 1, vidName: 1, _id: 0}, function(err, data) {
    res.render('editSkill', { data, id });
  });
});

router.post('/edited', function(req, res) {
  var id = req.query.id.toString();
  var vidCategory = id;
  var vidName = [ req.body.vidName1, req.body.vidName2, req.body.vidName3, req.body.vidName4, req.body.vidName5 ];
  var vidLink = [ req.body.vidLink1 , req.body.vidLink2, req.body.vidLink3, req.body.vidLink4, req.body.vidLink5 ];
  for(var i = 0; i<vidName.length; i++) {
    if(vidName[i] != "" && vidLink[i] != "") {
      var newPlayerVideo = new playerVideo({
        vidCategory: id,
        vidId: (i+1).toString(),
        vidName: vidName[i],
        vidLink: vidLink[i].replace("watch?v=", "embed/")
      });
      addAndUpdate(newPlayerVideo, function(err) {
        if(err) console.error('Error in addAndUpdate in /edited route');
      });
    }
  }
  res.redirect('/../admin/videos_admin.html');
});

function loginCheck(req, res, next) {
  if(req.isAuthenticated()) {
    if(req.user.admin == true) {
      next();
    }
  }
  else {
    res.json({Error: 'Not approved'});
  }
}

module.exports = router;

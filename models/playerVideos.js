var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  vidCategory: String,
  vidId: String,
  vidName: String,
  vidLink: String
});

var myModel = mongoose.model('vs', videoSchema);
module.exports.playerVideo = myModel;

module.exports.addAndUpdate = function(playerVideo, callback) {
  var vidCategory = playerVideo.vidCategory;
  var vidId = playerVideo.vidId;
  myModel.find( {vidCategory: vidCategory, vidId: vidId}, function(err, doc) {
    if(doc.length == 0) {
      playerVideo.save(callback);
    }
    else {
      var vidName = playerVideo.vidName;
      var vidLink = playerVideo.vidLink;
      myModel.update( {vidCategory: vidCategory, vidId: vidId}, {
        $set: {
          "vidName": vidName,
          "vidLink": vidLink
        }
      }, function(err, doc) {
        if(err) throw err;
      });
    }
  });
}

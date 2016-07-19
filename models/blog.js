var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  title : {type:String, required: true},
  body  : {type:String, required: true},
  category : String,
  date : Date,
  author : {type:String, required: true},
  mainimage : String,
  comment : [mongoose.Schema.Types.Mixed]
});

mongoose.model('Blog', BlogSchema);

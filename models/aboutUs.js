var mongoose = require('mongoose');

var aboutUsSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  content: String
});

mongoose.model('au', aboutUsSchema);

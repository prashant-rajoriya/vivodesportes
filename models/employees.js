var mongoose = require('mongoose');

var employeesSchema = new mongoose.Schema({
  _id: String,
  fullName: String,
  designation: String,
  empPic: String
});

mongoose.model('emp', employeesSchema);

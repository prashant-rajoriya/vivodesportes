var mongoose = require('mongoose');

var TournamentSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  type: String,
  date: Date,
  formattedDate: String,
  closeformattedDate: String,
  closedate:Date,
  type:String,
  status: String,
  feature : mongoose.Schema.Types.Mixed,
  rules : mongoose.Schema.Types.Mixed,
  fix: String,
  banner: String
});

mongoose.model('Tournament', TournamentSchema);
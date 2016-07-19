var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
  username : { type: String, required: true},
  email    : { type: String, required: true},
  password : { type: String, required: true },
  admin    : { type: Boolean, required: true },
  f_name: String,
  l_name: String,
  bdate: String,
  contact: Number,
  pre_foot: String,
  pre_posi: String,
  fav_footballer: String,
  fav_club: String,
  //requestVerify: Boolean,
  verifyhash: String,
  verifypassword:String,
  active: Number,
  rating: Number,
  forgothash: String,
  skills : {
    acc_rate: Number,
    agi_rate : Number,
    jump_rate : Number,
    sprint_rate : Number,
    stamina_rate : Number,
    Stren_rate : Number,
    ballcont_rate : Number,
    longpass_rate : Number,
    cross_rate : Number,
    drib_rate : Number,
    finish_rate : Number,
    shortpass_rate : Number,
    head_rate : Number,
    penalty_rate : Number,
    shotpower_rate : Number,
    defend_rate: Number,
  }
});

mongoose.model('Player', PlayerSchema);

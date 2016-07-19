var mongoose = require('mongoose');

var CareerSchema = new mongoose.Schema({
    "career_text": String,
    "src": String
});

mongoose.model('Career', CareerSchema);
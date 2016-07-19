var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Career = mongoose.model('Career');
// var ObjectId = mongoose.Types.ObjectId;

router.get('/test' , function(req , res) {
  // var c = new Career();
  // c.career_text = "Fuck Your Ass";
  // c.src = "https://www.youtube.com/embed/LU73MjEeUw8";
  // c.save(function(err , data){
  //   if(err) throw err;
  // res.json(data);
  // });
  res.redirect('..\\index.html');
});

router.get('/', function(req, res) {

Career.findById("5777787d4bcd5a36241a9275", function(err , data){
  if(err){
    return next(err);
  }
  else{
    console.log(data);

    res.json(data);
  }
})
});

router.post('/update',function (req,res,next) {
    console.log("req:");
    console.log(req.body);
    var body = req.body.career_text;
    var src =  req.body.src;

    Career.findByIdAndUpdate(
        "5777787d4bcd5a36241a9275", {
            $set: {
                "career_text": body,
                "src": src
            }
        },
        function(err, model) {
            if (err) console.log(err);
                res.redirect('../html/career.html');
        }
    );
});

module.exports=router;

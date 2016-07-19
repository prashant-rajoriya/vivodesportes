var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var au = mongoose.model('au');
var emp = mongoose.model('emp');

 var multer = require('multer');
 var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/image/employees/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname+'.jpg');
  }
 });
var upload = multer({storage: storage});

router.post('/edit', function(req, res) {
  var id = req.query.id;
  au.findById(id, function(err, data) {
    res.render('edit_about_us', { id, data });
  });
});

router.post('/edited', function(req, res) {
  var id = req.query.id;
  au.findById(id, function(err, data) {
    if(err) console.log('~Error in findById');

    if(data != null) {
      data.content = req.body.textArea;
      data.save(function(err, data) {
        if(err) console.log("~Error in save function of if part");
//        console.log(data);
      });
    }
    else {
      var obj = new au();
      obj._id = id;
      obj.content = req.body.textArea;
      obj.save(function(err, data) {
        if(err) console.log('~Error in save function of else part');
        // console.log(data);
      });
    }
  });
  res.redirect('/../admin/aboutus_admin.html');
});

router.post('/add', function(req, res) {
  res.render('add_emp');
});

router.post('/added', upload.single('empPic'), function(req, res) {
  emp.find(function(err, doc) {
    var totRows = doc.length;
    var e = new emp();
    e._id = totRows+1;
    e.fullName = req.body.empName;
    e.designation = req.body.empDes;
    e.empPic = req.file.originalname;
    e.save(function(err, doc) {
      if(err) throw err;
      res.redirect('/../admin/aboutus_admin.html');
    });
  });
});

router.get('/show', function(req, res) {
  var id = req.query.id;
  au.findById(id, function(err, data) {
    if(err) console.log("~Error in find function");
    res.json(data);
  });
});

router.get('/showEmp', function(req, res) {
  emp.find(function(err, doc) {
    if(err) throw console.error('~Error in find in showEmp');
    res.json(doc);
  });
});

router.post('/editEmp', function(req, res) {
  var id = req.query.id;
  console.log(id);
  res.render('edit_emp_designation', { id });
});

router.post('/editDesignation', function(req, res) {
  var id = req.query.id;
  var newDesignation = req.body.input1;
  console.log('designation'+newDesignation);
  emp.findByIdAndUpdate(id, { "designation": newDesignation }, function(err, doc) {
    if(err) throw console.error('~Error in findByIdAndUpdate function');
  });
  res.redirect('/../admin/aboutus_admin.html');
});

router.post('/removeEmp', function(req, res) {
  var id = req.query.id;
  var idString = id.toString();
  emp.findByIdAndRemove(id, function(err, doc) {
    if(err) throw console.error('~Error in first findByIdAndRemove');
  });
  emp.find({ "_id": { $gt: idString } }, function(err, doc) {
    for(var i=0; i<doc.length; i++) {
      var oldId = doc[i]._id;
      var newId = oldId-1;
      var empPic = doc[i].empPic;
      var designation = doc[i].designation;
      var fullName = doc[i].fullName;
      emp.findByIdAndRemove(oldId, function(err, doc) {
        if(err) throw console.error('~Error in second findByIdAndRemove');
      });
      var e = new emp();
      e._id = newId;
      e.empPic = empPic;
      e.designation = designation;
      e.fullName = fullName;
      e.save(function(err, data) {
        if(err) throw console.error('~Error in saving object');
      });
    }
  });
  res.redirect('/../admin/aboutus_admin.html');
});

module.exports = router;

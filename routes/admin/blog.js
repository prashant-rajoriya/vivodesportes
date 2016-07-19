var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var moment= require('moment');
var bodyParser = require('body-parser');
//Image upload
var multer = require('multer');

// var upload = multer();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image/uploads/blogs/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({storage: storage});

router.use(bodyParser.urlencoded({ extended: true }));



//Get Blog Page
router.get('/',function (req,res,next) {
    Blog.find({},null, {sort: {date: -1}}, function(err, data) {
        res.render('blog',{
            "posts": data,
            "counter": 1
        });
    }).skip(0).limit(4)
})

//For load more blog post pages
router.get('/load/:counter',function (req,res,next) {
    var counter = req.params.counter;
    Blog.find({},null, {sort: {date: -1}}, function(err, data) {
        res.render('blog',{
            "posts": data,
            "counter": counter
        });
    }).skip(counter*4).limit(4);
    counter++;
})

//Get the latest posts for the main home page
router.get('/home',function (req,res,next) {
    Blog.find({},null, {sort: {date: -1}}, function(err, data) {
        console.log(data);
        data.date = moment(data.date).format(" MM-DD-YYYY");
       // data.body=data.body.substring(0,400);
        res.json(data);
    }).limit(3)
})

//Get the add post page
router.get('/add',function (req,res,next) {
    res.render('addpost')
})

//Get the delete and edit post page
router.get('/delete',function (req,res,next) {
    Blog.find({}, function(err, data) {
        res.render('delete',{
            "posts": data
        })
    })
})

//Get the selected post to edit page with filled values
router.get('/edit/:id', function (req,res,next) {
    Blog.findById(req.params.id, function(err, data) {
        if (err) console.log("data not found");
        res.render('edit',{
            "post" : data
        })
    })
})

//Get the selected post to show as a single post with all the comments on it included
router.get('/show/:id',function (req,res,next) {
    Blog.findById(req.params.id, function(err, data) {
      console.log(data)
        res.render('show',{
            "post": data,
            "comments": data.comment
        });
    })
})

//When the admin post the new post. This add the post to the database
router.post('/add', upload.single('mainimage') ,function (req,res,next) {
    console.log(req.body);
    console.log(req.file);


    var bg = new Blog();
    bg.title = req.body.title;
    bg.body = req.body.body;
    bg.category = req.body.category;
    bg.author = req.body.author;
    bg.date = new Date();

    //uploading image
      if(req.file){
        var mainimage = req.file.originalname;
        bg.mainimage = mainimage;
        console.log("Uploading " + mainimage + "successfully done");
      }
      else{
        bg.mainimage = "noimage.png";
      }
    bg.save(function(err, data) {
        if (err) console.error(err);

        console.log("Added");
        res.redirect('/blog');
    })
});

router.post('/del',function (req,res,next) {
    var postid        = req.body.postid;
    Blog.remove({
            "_id" :postid
        },function (err,data) {
        if (err)
            throw err;
        else {
            res.redirect('/blog');
        }
    })
})

//When the admin edit a selected post and select the update button ,this will update the previous post
router.post('/update',upload.single('mainimage'),function (req,res,next) {
    console.log(req.body);
    console.log(req.file);
    var postid = req.body.postid;
    Blog.findById(postid, function(err, data) {
        data.title = req.body.title;
        data.body = req.body.body;
        data.category = req.body.category;
        data.author = req.body.author;

        if(req.file){
          var mainimage = req.file.originalname;
          data.mainimage = mainimage;
          console.log("Uploading " + mainimage + "successfully done");
        }

        data.save(function(err, data) {
            if (err) console.log("error in edit function");
            res.redirect('/blog')
        })
    })
})

//When any user post a comment on a selected post,this add the comment to it
router.post('/addcomment',function (req,res,next) {
    var postid        = req.body.postid;
    Blog.findByIdAndUpdate(
        postid, {
            $push: {
                "comment": {
                    name: req.body.name,
                    email: req.body.email,
                    body : req.body.body
                }
            }
        },
        function(err, model) {
            if (err) console.log(err);
            res.redirect('/blog/show/'+postid)
        }
    );
})

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = mongoose.model('Player');


//--------------------------------------------APIs------------------------------------------------------------------------------------//


//search
//-> GET /search?q=tobi+ferret
//req.query.q = "tobiferret"

router.get('/', function(req, res) {
    var search = req.query.search;
    Player.find({
        $or: [{
            f_name: new RegExp('^' + search, "i")
        }, {
            l_name: new RegExp('^' + search, "i")
        }]
    }, function(err, data) {
        if (err) return console.error(err);
        else if (data === "" || data === null) return res.json({
            data: "data not found"
        });
        res.json(data);
    });
});

//--------------------------------------------------END------------------------------------------------------------------------------//

module.exports = router;

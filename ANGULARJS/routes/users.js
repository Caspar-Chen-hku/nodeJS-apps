var express = require('express');
var router = express.Router();
/*
* GET CommodityList.
*/
router.get('/commodities', function(req, res)
{ var db = req.db;
var collection = db.get('commodities');
collection.find({},{},function(err,docs){
if (err === null)
res.json(docs);
else res.send({msg: err});
});
});


/*
* POST to add commodity
*/
router.post('/addcommodity', function (req, res) {
 var db = req.db;
 var collection = db.get('commodities');
 //insert new commodity document
 collection.insert(req.body, function (err, result) {
 res.send(
 (err === null) ? { msg: '' } : { msg: err }
 );
 });
});

/*
* DELETE to delete a commodity.
*/
router.delete('/deletecommodity/:id', function(req, res) {
    var id = req.params.id;
    var db = req.db;
    var collection = db.get('commodities');
    collection.remove({'_id':id}, function(err, result){
        res.send(
        (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
* PUT to update a commodity (status)
*/
router.put('/updatecommodity/:id', function (req, res) {
 var db = req.db;
 var collection = db.get('commodities');
 var commodityToUpdate = req.params.id;
 var newStatus = req.body.status;

//TO DO: update status of the commodity in commodities collection, according to
//commodityToUpdate and newStatus
collection.update({_id:commodityToUpdate},{$set: {status:newStatus}}, function(err,result){
    res.send(
    (err === null) ? { msg: '' } : { msg: err }
    );
});
});

module.exports = router;

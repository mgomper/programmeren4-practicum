var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.all( new RegExp("[^(\/)]"), function (req, res, next) {

    //
    console.log("VALIDATE TOKEN")

    var token = (req.header('Authorization')) || '';

    auth.decodeToken(token, function (err, payload) {
        if (err) {
          res.json({"error: "  : "onjuiste authorisatie"});
            console.log('Error handler: ' + err.message);
            res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
        } else {
            next();
        }
    });
});

router.post('/rentals/:userid/:inventoryid', function(req, res) {

    var user = req.params.userid;
    var inventory = req.params.inventoryid;

    res.contentType('application/json');

    db.query('INSERT INTO rental(customer_id, inventory_id) VALUES (?, ?);', [user, inventory], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

module.exports = router;

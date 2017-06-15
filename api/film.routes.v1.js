var express = require('express');
var routes = express.Router();
var db = require('../config/db');




///Maakt een nieuwe uitlening voor de gegeven gebruiker van het exemplaar met gegeven inventoryid.
routes.post('/rentals/:userid/:inventoryid', function(req, res) {

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


//uitlening verwijderen
routes.delete('/rentals/:userid/:inventoryid', function(req, res) {

    var user = req.params.userid;
    var inventory = req.params.inventoryid;


    res.contentType('application/json');

    db.query('DELETE FROM rental WHERE customer_id=? AND inventory_id=?', [user, inventory], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//uitlening wijzigen
routes.put('/rentals/:userid/:inventoryid', function(req, res) {

    // var user = req.params.userid;
    // var inventory = req.params.inventoryid;
    var user = req.params.userid;
    var inventory = req.params.inventoryid;

    res.contentType('application/json');
    db.query('UPDATE rental SET inventory_id=? WHERE customer_id=?', [user, inventory], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});



// Alle uitgeleende films aan de hand van rental_id
routes.get('/rentals/:rental_id', function(req, res) {

    var rentalId = req.params.rental_id;

    res.contentType('application/json');

    db.query('SELECT * FROM rental WHERE rental_id=?', [rentalId], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

// Film ophalen aan de hand van het film id
routes.get('/films/:film_id', function(req, res) {

    var filmsFilmid = req.params.film_id;

    res.contentType('application/json');

    db.query('SELECT * FROM film WHERE FILM_ID=?', [filmsFilmid], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});


module.exports = routes;


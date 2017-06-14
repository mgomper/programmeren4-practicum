var express = require('express');
var routes = express.Router();
var db = require('../config/db');

// Maakt een nieuwe uitlening voor de gegeven gebruiker van het exemplaar met gegeven inventoryid
routes.post('/rentals/:customer_id/:inventory_id', function(req, res) {

    var customerId = req.params.customer_id;
    var inventoryId = req.params.inventory_id;
    var query = {
        sql: 'INSERT INTO `rental`(`customer_id`, `inventory_id`) VALUES (?, ?)',
        values: [customerId, inventoryId],
        timeout: 2000 // 2secs
    };

    // console.dir(rentals);
    // console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
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


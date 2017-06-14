var express = require('express');
var routes = express.Router();
var db = require('../config/db');

// Film ophalen aan de hand van het film id

routes.get('/rentals/:rental_id', function(req, res) {

    var rentalId = req.params.rental_id;

    res.contentType('application/json');

    db.query('SELECT * FROM rental WHERE RENTAL_ID=?', [rentalId], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});


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


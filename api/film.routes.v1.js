var express = require('express');

var routes = express.Router();
var db = require('../config/db');


// Geef een lijst van alle films
// routes.get('/films', function(req, res) {
//
//     res.contentType('application/json');
//
//     db.query('SELECT * FROM film', function(error, rows, fields) {
//         if (error) {
//             res.status(401).json(error);
//         } else {
//             res.status(200).json({ result: rows });
//         };
//     });
// });


//Endpoint 3 - Geeft alle informatie van de gevraagde films met een offset en count
routes.get("/films", function(req, res){

    var offset = parseInt(req.query.offset);
    var count = parseInt(req.query.count);

    res.contentType('application/json');

    db.query("SELECT " +
        "film.film_id, " +
        "film.title, " +
        "film.description, " +
        "film.length, " +
        "film.rating, " +
        "film.release_year, " +
        "film.rental_rate, " +
        "film.special_features, " +
        "inventory.inventory_id " +
        "FROM film " +
        "INNER JOIN inventory ON film.film_id = inventory.film_id " +
        "GROUP BY film_id " +
        "LIMIT ? OFFSET ?", [count,offset], function(error, rows, fields){
        if (error) {
            res.status(401).json(error);
        } else {

            res.status(200).json({ result: rows });

        };
    });
});



// Endpoint 4 - Film informatie ophalen aan de hand van film_id
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

routes.get('/filmres/:customer_id/:inventory_id', function(req, res) {

    var customer_id = req.params.customer_id;
    var inventory_id = req.params.inventory_id;

    res.contentType('application/json');

    db.query('SELECT * FROM rental WHERE customer_id=? AND inventory_id = ? ', [customer_id, inventory_id], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});


// Endpoint 5 - Alle uitgeleende films aan de hand van rental_id
routes.get('/rentals/:userid', function(req, res) {

    var userId = req.params.userid;

    res.contentType('application/json');

    db.query('SELECT '  +
        'film.film_id, ' +
        'film.title, ' +
        'film.description, ' +
        'film.release_year, ' +
        'film.length, ' +
        'film.rating, ' +
        'film.special_features, ' +
        'inventory.inventory_id, ' +
        'rental.rental_id, ' +
        'rental.rental_date, ' +
        'rental.return_date, ' +
        'customer.first_name, ' +
        'customer.customer_id, ' +
        'customer.active ' +
        'FROM film ' +
        'LEFT JOIN inventory USING(film_id) ' +
        'LEFT JOIN rental USING(inventory_id) ' +
        'LEFT JOIN customer USING(customer_id) ' +
        'WHERE customer_id=?;', [userId], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        }
    });
});


// Endpoint 6 - Maakt een nieuwe uitlening voor de gegeven gebruiker van het exemplaar met gegeven inventory_id.
// routes.post('/rentals/:userid/:inventoryid', function(req, res) {
//
//
// router.all( new RegExp("[^(\/)]"), function (req, res, next) {
//
//     //
//     console.log("VALIDATE TOKEN")
//
//     var token = (req.header('Authorization')) || '';
//
//     auth.decodeToken(token, function (err, payload) {
//         if (err) {
//           res.json({"error: "  : "onjuiste authorisatie"});
//             console.log('Error handler: ' + err.message);
//             res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
//         } else {
//             next();
//         }
//     });
// });

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



// Endpoint 7 - Bestaande uitlening wijzigen
routes.put('/rentals/:userid/:inventoryid', function(req, res) {

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


//Endpoint 8 - Bestaande uitlening verwijderen
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


module.exports = routes;

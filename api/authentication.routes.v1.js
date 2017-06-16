var express = require('express');
var router = express.Router();

var auth = require('../auth/authentication');
var db = require('../config/db');

//
// Hier gaat de gebruiker inloggen.
// Input: username en wachtwoord
// ToDo:
//	 - zoek de username in de database, en vind het password dat opgeslagen is
// 	 - als user gevonden en password matcht, dan return valide token
//   - anders is de inlogpoging gefaald - geef foutmelding terug.
//
router.post('/login', function(req, res) {

    // Even kijken wat de inhoud is
    console.dir(req.body.username + ' | ' + req.body.password + ", door u ingevoerd.");

    // De username en pwd worden meegestuurd in de request body
    var username = req.body.username;
    var password = req.body.password;

    // Dit is een dummy-user - die haal je natuurlijk uit de database.
    // Momenteel zetten we ze als environment variabelen. (Ook op Heroku!)
    // var _dummy_username = "username";
    // var _dummy_password = "test";

    db.query('SELECT customer_id FROM customer WHERE customer_id = ? AND password = ?;', [username, password], function(error, rows, fields) {
        if (rows.length > 0) {
            console.log('Input: username = ' + username + ', password = ' + password + ' IS CORRECT');
                var token = auth.encodeToken(username);
                res.status(200).json({
                    "token": token,
                    "melding" : "Yo waddap gasten."
                });
        } else {
            console.log('Input: username = ' + username + ', password = ' + password + ' IS INCORRECT');
            res.status(401).json({ "error": " INCORRECT" })
        }
    });

    // Kijk of de gegevens matchen. Zo ja, dan token genereren en terugsturen.
    // if (username == _dummy_username && password == _dummy_password) {
    //     var token = auth.encodeToken(username);
    //     res.status(200).json({
    //         "token": token,
    //         "Mikey: " : "Yo waddap gasten."
    //     });
    // } else {
    //     console.log('Input: username = ' + username + ', password = ' + password);
    //     res.status(401).json({ "error": "Onjuist, dikke vette peace." })
    // }

});

router.post('/register', function(req, res) {

    // Even kijken wat de inhoud is
    console.dir(req.body.username + ' | ' + req.body.password + ", door u ingevoerd.");

    // De username en pwd worden meegestuurd in de request body
    var username = req.body.username;
    var password = req.body.password;

    // Dit is een dummy-user - die haal je natuurlijk uit de database.
    // Momenteel zetten we ze als environment variabelen. (Ook op Heroku!)
    // var _dummy_username = "username";
    // var _dummy_password = "test";

    db.query('INSERT INTO customer(customer_id, password) VALUES(?, "?");', [username, password], function(error, rows, fields) {
      if (error) {
          res.status(401).json(error);
          console.log(error);
      } else {
          res.status(200).json({ result: rows });
      }
    });


});

// Hiermee maken we onze router zichtbaar voor andere bestanden.
module.exports = router;

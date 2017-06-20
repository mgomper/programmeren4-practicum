var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var db = require('./config/db');

var filmroutes_v1 = require('./api/film.routes.v1');
// var auth_routes_v1 = require('./api/authentication.routes.v1');

var auth = require('./auth/authentication');


var config = require('./config/config');
var expressJWT = require('express-jwt');

var app = express();

module.exports = {};

app.all( new RegExp("[^(\/api/v1/login, api/v1/register)]"), function (req, res, next) {

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
// bodyParser zorgt dat we de body uit een request kunnen gebruiken,
// hierin zit de inhoud van een POST request.
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Beveilig alle URL routes, tenzij het om /login of /register gaat.
// app.use(expressJWT({
//     secret: config.secretkey
// }).unless({
//     path: [
//         { url: '/api/v1/login', methods: ['POST'] },
//         { url: '/api/v1/register', methods: ['POST'] }
//     ]
// }));

app.set('port', (process.env.PORT | config.webPort));
app.set('env', (process.env.ENV | 'development'))



app.use('/api/v1', filmroutes_v1);

app.use('/api/v1', auth_routes_v1);



app.use(function(err, req, res, next) {
    // console.dir(err);
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

<<<<<<< HEAD
=======
app.get('/films', function(req, res) {
    res.contentType('application/json');

    db.query('SELECT * FROM film', function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});


>>>>>>> e5f87a79b6e94cf268855818b68cae7eab545198
app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('De ToDo server luistert op port ' + app.get('port'));
});

module.exports = app;

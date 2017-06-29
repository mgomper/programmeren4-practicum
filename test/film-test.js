process.env.NODE_ENV = 'test';
process.env.APP_USERNAME = 'username';
process.env.APP_PASSWORD = 'password';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var chould = chai.should();
var db = require('../config/db.js');

chai.use(chaiHttp);

// temp variables to use in the test iteration
var token = "";
var username = "1";
var password = "testje"


describe('Rentals route', function(){

// Kijkt of je inlogt, anders 401 error 
it('should return 401 if not loggedIn on GET at /api/v1/rentals', function(done){
        chai.request(server)
            .get('/api/v1/rentals')
            .end( function(err, res){
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('code').that.is.a('string');
                res.body.code.should.equal('credentials_required');
                done();
            });
    });


// Controle of de inloggegevens goed zijn 
it('should return 200 if loggedIn on GET at /api/v1/rentals', function(done){
        chai.request(server)
            .get('/api/v1/rentals')
            .set('Authorization', + token)
            .end( function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('result').that.is.a('array');
                res.body.result.should.have.length(0);

                done();
            });
    });


// Het registreren van een nieuw account, test of dit werkt
it('should register test account on POST at /api/v1/register', function(done){
        chai.request(server)
            .post('/api/v1/register')
            .send({"username":"1", "password":"testje"})
            .end( function(err, res){
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('message').that.is.a('string');
                res.body.should.have.property('token').that.is.a('string');
                res.body.should.have.property('username').that.is.a('string');
                res.body.message.should.equal('Successfully created user');
                token = res.body.token;
                done();
            });
    });

});

process.env.NODE_ENV = 'test';
process.env.APP_USERNAME = 'username';
process.env.APP_PASSWORD = 'password';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var chould = chai.should();
var value;
var testuser = {
  "username": "46",
  "password": "'test'"
}

chai.use(chaiHttp);

var getToken = function() {
    var user = {
      "username": "46",
      "password": "'test'"
    }

    chai.request(server)
        .post('/api/v1/login')
        .set('Content-Type', 'application/json')
        .send(user)
        .end(function(err, res) {
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            res.should.have.status(200);
            value = res.body.token;
        });
}

it('should not register test account on POST at /api/v1/register when account already exists', function(done){
        chai.request(server)
            .post('/api/v1/register')
            .send({"username":"55", "password":"test"})
            .end( function(err, res){
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('code').that.is.a('string');
                res.body.code.should.equal('ER_DUP_ENTRY');
                done();
            });
    });

describe('Get a token', function() {

    it('should return a valid token', function(done) {
        chai.request(server)
            .post('/api/v1/login')
            .set('Content-Type', 'application/json')
            .send(testuser)
            .end(function(err, res) {
              res.body.should.have.property('token');
              res.should.have.status(200);
                done();
            });
    });
});

describe('Get a specific rental', function() {
    it('should return a specific rental', function(done) {
        chai.request(server)
            .get('/api/v1/rentals/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTkxNzIzMzksImlhdCI6MTQ5ODk5OTUzOSwic3ViIjoiNDYifQ.OF01Vu_gMIw_RUpv9Hnjo0Win0RDIjOcQv6tqWwuc5M')
            .end(function(err, res) {
              res.body.should.have.property('result').that.is.an('array');
              res.should.have.status(200);
                done();
            });
    });
});

describe('Get a specific film', function() {
    it('should return a specific film', function(done) {
        chai.request(server)
            .get('/api/v1/films/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTkxNzIzMzksImlhdCI6MTQ5ODk5OTUzOSwic3ViIjoiNDYifQ.OF01Vu_gMIw_RUpv9Hnjo0Win0RDIjOcQv6tqWwuc5M')
            .end(function(err, res) {
              res.body.should.have.property('result').that.is.an('array');
              res.body.should.have.property('film_id');
              res.body.should.have.property('title');
              res.should.have.status(200);
                done();
            });
    });
});

describe('Get a no auth message', function() {
    it('should return an error', function(done) {
        chai.request(server)
            .get('/api/v1/films/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'geen valide token')
            .end(function(err, res) {
              res.body.should.not.have.property('result').that.is.an('array');
              res.body.should.have.property('error:');
                done();
            });
    });
});


describe('Get a rental count', function() {
    it('should return a rental count', function(done) {
        chai.request(server)
            .get('/api/v1/rentalcount/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTkxNzIzMzksImlhdCI6MTQ5ODk5OTUzOSwic3ViIjoiNDYifQ.OF01Vu_gMIw_RUpv9Hnjo0Win0RDIjOcQv6tqWwuc5M')
            .end(function(err, res) {
              res.body.should.have.property('"COUNT(inventory_id)"');
              res.should.have.status(200);
                done();
            });
    });
});

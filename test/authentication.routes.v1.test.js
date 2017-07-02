
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
        username: "46",
        password: "'test'"
    }
    chai.request(server)
        .post('/api/v1/login')
        .set('Content-Type', 'application/json')
        .send(user)
        .end(function(err, res) {
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            // Bewaar het token in de globale variabele, zodat de tests het token kunnen gebruiken.
            value = res.body.token;
        });
}

describe('Get a token', function() {

    // Zorg dat we een token hebben zodat we de tests kunnen uitvoeren.

    // Hier start een testcase
    it('should return a valid token', function(done) {
        chai.request(server)
            .post('/api/v1/login')
            .set('Content-Type', 'application/json')
            .send({	"username": "46",
	                   "password": "'test'"})
            .end(function(err, res) {
              res.body.should.have.property('token');
                // we doen hier niets - we willen alleen het token dat opgehaald is.
                done();
            });
    });
});

describe('Get a valid token', function() {

    // Zorg dat we een token hebben zodat we de tests kunnen uitvoeren.
    before(function() {
        getToken();
    });

    // Hier start een testcase
    it('should return a valid token', function(done) {
        chai.request(server)
            .get('/api/v1/films')
            .set('Content-Type', 'application/json')
            .set('Authorization', value)
            .end(function(err, res) {
                // we doen hier niets - we willen alleen het token dat opgehaald is.
                done();
            });
    });
});


describe('Auth API v1', function() {
//kijkt simpelweg of er een object binnenkomt
    it('returns UnauthorizedError on GET /api/v1/todos when not logged in', function(done) {
        chai.request(require('../server.js'))
            .get('/api/v1/films/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });

});

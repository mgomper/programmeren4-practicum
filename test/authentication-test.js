process.env.NODE_ENV = 'test';
process.env.APP_USERNAME = 'username';
process.env.APP_PASSWORD = 'password';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var chould = chai.should();

chai.use(chaiHttp);

describe('Auth API v1', function() {


// Kijkt of er een object binnenkomt
    it('returns UnauthorizedError on GET /api/v1/films when not logged in', function(done) {
        chai.request(require('../server.js'))
            .get('/api/v1/films')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').equal('No authorization token was found');
                res.body.should.have.property('name').equal('UnauthorizedError');
                done();
            });
    });


// Kijkt of de username en password combinatie juist is
it('returns an error on POST /api/v1/login with invalid credentials ', function(done) {
        var user = {
            "username": "invalid", 
            "password": "invalid"
        }
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('success').equal('Username or password does not exist');
                res.body.error.should.equal('Invalid credentials')
                done();
            });
    });

});



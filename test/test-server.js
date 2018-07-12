var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Bookmarks', function(){
    it('should list all bookmarks on /api/bookmarks GET', function(done){
        chai.request(server)
            .get('/api/bookmarks')
            .end(function(err,res){
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.should.have.property('_id');
                res.should.have.property('name');
                res.should.have.property('link');
                
                done();
            });
    });
    it('should add a new bookmark on /api/bookmarks POST', function(done){
        chai.request(server)
            .post('/api/bookmark')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should update the specific bookmark on /api/bookmarks PUT', function(done){
        chai.request(server)
            .put('/api/bookmarks')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should delete the specific bookmark on /api/bookmarks DELETE', function(done){
        chai.request(server)
            .delete('/api/bookmarks')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});
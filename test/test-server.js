var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var sinon = require('sinon');

var should = chai.should();

chai.use(chaiHttp);

describe('Bookmarks', function(){
    it('should list all bookmarks on /api/bookmarks GET', function(done){

        var request = sinon.stub(chai, 'request');
        
        get.returns({success: true, data: {
            "_id": {
                "$oid": "5b6b753c4393560610f69e9f"
            },
            "name": "Yahoo",
            "link": "https://ca.yahoo.com/",
            "__v": 0
        }});

        chai.request(server)
            .get('/api/bookmarks')
            .end(function(err,res){
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.success.should.be.true;
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
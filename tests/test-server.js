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
                res.should.have.status(200);
                done();
            });
    });
    it('should add a new bookmark on /api/bookmarks POST');
    it('should update the specific bookmark on /api/bookmarks PUT');
    it('should delete the specific bookmark on /api/bookmarks DELETE');
});
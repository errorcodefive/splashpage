process.env.NODE_ENV = 'test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

var Bookmark = require('../schemas/bookmarks');

chai.use(chaiHttp);

//variables for tests here


describe('bookmarks', () =>{
    beforeEach((done)=>{
       Bookmark.remove({}, (err)=>{
           done();
       });
    });
    describe('/GET Bookmarks', ()=>{
        it('it should GET all Bookmarks', (done)=>{
            chai.request(server)
                .get('/api/bookmarks')
                .end((err,res)=>{
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.data.length.should.be.eql(0);
                    res.body.success.should.be.true;
                done();
            });
        });
    });
    describe('/POST Bookmark', ()=>{
        it('it should NOT POST a bookmark without link',(done)=>{
            let bookmark = {
                name: "asdf"
            }
            chai.request(server)
            .post('/api/bookmarks')
            .send(bookmark)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.not.have.property('success');
                res.body.should.be.an('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('link');
                done();
            });
        });
        it('it should POST a bookmark with just name and link', (done)=>{
            let bookmark = {
                name: 'Google',
                link: 'http://google.com'
            }
            chai.request(server)
            .post('/api/bookmarks')
            .send(bookmark)
            .end((err,res)=>{
                res.should.have.status(200);
                res.should.be.an('object');
                res.body.success.should.be.true;
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('link');
                done();
            });
        });
    });
    describe('/PUT Bookmark', ()=>{
        it('it should UPDATE a bookmark with a given ID', (done)=>{
            let bookmark = new Bookmark({name: "firstname", link: "firstlink"});
            bookmark.save((err, bookmark)=>{
                chai.request(server)
                .put('/api/bookmarks/'+bookmark.id)
                .send({name: "secondname", link: "secondlink"})
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('success').be.true;
                    res.body.should.have.property('updateBookmark');
                    res.body.success.should.be.true;
                    res.body.updateBookmark.should.have.property('name').eql('secondname');
                    res.body.updateBookmark.should.have.property('link').eql('secondlink');
                    done();
                });
            });
        });
    });
    describe('/DELETE Bookmark', ()=>{
        it('it should DELETE a bookmark with a given ID', (done)=>{
            let bookmark = new Bookmark({name: 'firstname', link: 'firstlink'});
            bookmark.save((err, bookmark)=>{
                chai.request(server)
                .delete('/api/bookmarks/'+bookmark.id)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('success').be.true;
                    done();
                });
            });
        });
    });
})
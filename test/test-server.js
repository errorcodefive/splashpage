process.env.NODE_ENV = 'test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

var Bookmark = require('../schemas/bookmarks');

chai.use(chaiHttp);
//variables for tests here
var bm_test1 = {
    name: "dummy_bm_1",
    link: "dumm_link_1",
    command: "command_1"
}
var bm_test2 = {
    name: "dummy_bm_2",
    link: "dummy_link_2",
    command: "command_2"
}

describe('bookmarks', () =>{
    beforeEach((done)=>{
        Bookmark.remove({}, err=>{
            let bookmark1 = new Bookmark(bm_test1);
            let bookmark2 = new Bookmark(bm_test2);
            bookmark1.save((err,res)=>{
                console.log("bm1res: " + JSON.stringify(res));
                bookmark2.save((err2,res2)=>{
                    if(err2) console.log("ERR bm2: " + err2);
                    console.log("bm2res: " + JSON.stringify(res2));
                    done();
                })
            });
        });
    });
    describe('/GET Bookmarks', ()=>{
        it('it should GET all Bookmarks', (done)=>{
            chai.request(server)
                .get('/api/bookmarks')
                .end((err,res)=>{
                    console.log("GET" + JSON.stringify(res.body.data));
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.data.length.should.be.eql(2);
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
            console.log("inside the delete");
            chai.request(server)
            .get('/api/bookmarks/')
            .then((res)=>{
                console.log("res: "+ JSON.stringify(res.body.data))
                chai.request(server)
                .delete('/api/bookmarks/'+res.body.data[0]._id)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('success').be.true;
                    done();
                })
            })
        });
    });
})
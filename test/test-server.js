process.env.NODE_ENV = 'test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

chai.use(chaiHttp);

describe('bookmarks', () =>{
    beforeEach((done)=>{
        
    })
})
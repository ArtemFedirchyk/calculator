var expect = require('chai').expect;

var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');

var id = undefined; // TODO: will be used for deleting test record from DB

describe('Routing', function() {
  var url = 'http://localhost:8080';
  // This Before block contains needed configuration, which should be performed befor tests executing
  before(function(done) {
    // Configuration for connection to DB
    mongoose.connect('mongodb://ember:secretpassword@ds049631.mongolab.com:49631/todo-mvc');							
    done();
  });
  
  describe('calculations', function() {
    it('should successfully save reecord in DB and return JSON from DB', function(done){
		var body = { calculation: {
									firstValue: '2',
									secondValue: '1',
									operand: '-',
									result: null
								}
					};
		request(url)
			.post('/api/v1/calculations')
			.send(body)
			.expect('Content-Type', /json/)
			.expect(200) //Status code (meens all is OK)
			.end(function(err,res) {
				if (err) {
					throw err;
				}

				// Should.js fluent syntax applied
				res.body.calculation.should.have.property('_id');
		        res.body.calculation.firstValue.should.equal('2');
		        res.body.calculation.secondValue.should.equal('1');
		        res.body.calculation.operand.should.equal('-');
		        res.body.calculation.result.should.equal('1');                    
		        done();
		});
	});
	it('should return all resords of Calculation"s models, which are stored in DB', function(){
		request(url)
		.get('/api/v1/calculations')
		.expect('Content-Type', /json/)
		.expect(200) //Status code (meens all is OK)
		.end(function(err,res) {
				if (err) {
					throw err;
				}
			    done();
		});
	});
  });
});
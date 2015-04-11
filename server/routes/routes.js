var express = require('express'); 							// calls express
var calculations = require('./calculations/calculations'); 	// calls calculation package with script for 
															// simple mathematical calculations
// ROUTES FOR OUR API
var router = express.Router();              				// gets an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(request, response) {
    response.json({ message: 'Server runs at port - 8080 !' });   
});
 
// on routes that end in /calculation is responsible for handle POST request with JSON from client
router.route('/calculations')
    .post(function(request, response){calculations.calculate(request, response)})
    .get(function(request, response){calculations.getAllCalculations(request, response)});

module.exports = router;
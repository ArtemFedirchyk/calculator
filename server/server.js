// BASE SETUP
// calls the packages we need
var express    = require('express');        // calls express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');    // calls body-pareser package
var routes = require('./routes/index');     // calls package with routes

var mongoose   = require('mongoose'); 		// calls mongoose driver package
mongoose.connect('mongodb://ember:secretpassword@ds049631.mongolab.com:49631/todo-mvc'); // connect to our database
 
// configures app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);


// Add CORS headers
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Resource', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

var port = process.env.PORT || 8080;        // set our port
 
// REGISTERS OUR ROUTES
// all of our routes will be prefixed with /api/v1
app.use('/api/v1/', routes);

// STARTS THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
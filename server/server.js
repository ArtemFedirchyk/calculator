// BASE SETUP
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Calculation = require('./models/calculation'); 	// call todo model package

var mongoose   = require('mongoose'); 		// call mongoose driver package
mongoose.connect('mongodb://ember:secretpassword@ds049631.mongolab.com:49631/todo-mvc'); // connect to our database
 
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add CORS headers
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Resource', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


var port = process.env.PORT || 8080;        // set our port
 
// ROUTES FOR OUR API
var router = express.Router();              // get an instance of the express Router
 
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(request, response) {
    response.json({ message: 'Server runs at port - 8080 !' });   
});
 
// on routes that end in /calculation is responsible for handle POST request with JSON from client
// ----------------------------------------------------
router.route('/calculations')
    .post(function(request, response){

        var calculationOnServer = new Calculation();

        var operand = request.body.calculation.operand;
        var result = 0;


        firstValue = parseFloat(request.body.calculation.firstValue);
        secondValue = parseFloat(request.body.calculation.secondValue);
        
            if(operand === '+'){
                result = firstValue + secondValue;
            } if (operand === '-'){
                result = firstValue - secondValue;
            } if (operand === '*'){
                result = firstValue * secondValue;
            } if (operand === '/'){
                result = firstValue / secondValue;
            }

        calculationOnServer.firstValue = request.body.calculation.firstValue;
        calculationOnServer.secondValue = request.body.calculation.secondValue;
        calculationOnServer.operand = request.body.calculation.operand;
        calculationOnServer.result = result.toString();
        
        console.log(calculationOnServer);
        
        // save the Calculation and check for errors
        calculationOnServer.save(function(error) {
            if (error)
                response.send(error);
            response.json({ calculation: calculationOnServer });
        });
    })
    .get(function(request, response){
        Calculation.find(function(error, calculations){
            if(error) response.send(error);
                response.json({
                    calculations: calculations
                });
        });
    });
// -----------------------------------------------------
 
// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api/v1
app.use('/api/v1/', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
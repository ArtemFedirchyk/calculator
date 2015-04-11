var Calculation = require('../../models/calculation'); 					// calls todo model package
var calculationHelper = require('../../helpers/calculation-helper'); 	// calls helpers package

module.exports.calculate = function(request, response){
	// creates new Calculation model
	var calculationOnServer = new Calculation();
    
    // takes values for calculations from request
    var firstValue = parseFloat(request.body.calculation.firstValue);
    var secondValue = parseFloat(request.body.calculation.secondValue);
    var operand = request.body.calculation.operand;

    // perfoming mathematical operations according to curent arephmetical operator and receiving result 
    var result = calculationHelper.calculate(firstValue, secondValue, operand);
        
    // sets needed filds to new Calculation model    
    calculationOnServer.firstValue = request.body.calculation.firstValue;
    calculationOnServer.secondValue = request.body.calculation.secondValue;
    calculationOnServer.operand = request.body.calculation.operand;
    calculationOnServer.result = result.toString();
    
    // just for view model in console
    console.log(calculationOnServer);
    
    // saves the Calculation model and check for errors
    calculationOnServer.save(function(error) {
        if (error)
            response.send(error);
        response.json({ calculation: calculationOnServer });
    });
};

module.exports.getAllCalculations = function(request, response){
	// finds all Calculation models' records
	Calculation.find(function(error, calculations){
            if(error) response.send(error);
                response.json({
                    calculations: calculations
                });
        });
};
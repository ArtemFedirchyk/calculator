var Calculation = require('../../models/calculation'); 	// calls todo model package

module.exports.calculate = function(request, response){
	// creates new Calculation model
	var calculationOnServer = new Calculation();
    var result = 0;

    // takes values for calculations from request
    var firstValue = parseFloat(request.body.calculation.firstValue);
    var secondValue = parseFloat(request.body.calculation.secondValue);
    var operand = request.body.calculation.operand;

    // perfoming mathematical operations according to curent arephmetical operator
        if(operand === '+'){
            result = firstValue + secondValue;
        } if (operand === '-'){
            result = firstValue - secondValue;
        } if (operand === '*'){
            result = firstValue * secondValue;
        } if (operand === '/'){
            result = firstValue / secondValue;
        }

    // sets needed filds to new Calculation model    
    calculationOnServer.firstValue = request.body.calculation.firstValue;
    calculationOnServer.secondValue = request.body.calculation.secondValue;
    calculationOnServer.operand = request.body.calculation.operand;
    calculationOnServer.result = result.toString();
    
    console.log(calculationOnServer);
    
    // save the Calculation model and check for errors
    calculationOnServer.save(function(error) {
        if (error)
            response.send(error);
        response.json({ calculation: calculationOnServer });
    });
};

module.exports.getAllCalculations = function(request, response){
	Calculation.find(function(error, calculations){
            if(error) response.send(error);
                response.json({
                    calculations: calculations
                });
        });
};
module.exports.calculate = function(firstValue, secondValue, operand){
	var result = 0;
	// perfoming mathematical operations according to curent arephmetical operand
	if(operand === '+'){
            result = firstValue + secondValue;
        } if (operand === '-'){
            result = firstValue - secondValue;
        } if (operand === '*'){
            result = firstValue * secondValue;
        } if (operand === '/'){
            result = firstValue / secondValue;
        }
    return result;
};
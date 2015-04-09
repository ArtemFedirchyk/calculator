var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CalculationSchema = new Schema({
	firstValue: String,
	secondValue: String,
	operand: String,
	result: String
});

module.exports = mongoose.model('Calculation', CalculationSchema);
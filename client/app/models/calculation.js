import DS from 'ember-data';

var Calculation = DS.Model.extend({
	firstValue: DS.attr('String'),
	secondValue: DS.attr('String'),
	operand: DS.attr('String'),
	result: DS.attr('number')
});

export default Calculation;
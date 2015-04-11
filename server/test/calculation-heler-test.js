	var expect = require('chai').expect;
	var calculationHelper = require('../helpers/calculation-helper'); 

	describe('calculation-helper', function(){
		describe('#calculate', function(){
			it('should perform operation of addition of two values', function(){
				var firstValue = 10;
				var secondValue = 121;
				var operand = '+';
				var result = calculationHelper.calculate(firstValue, secondValue, operand);

				expect(result).to.be.a('number');
				expect(result).to.equal(131);
			});
			it('should perform operation of substraction of two values', function(){
				var firstValue = 100;
				var secondValue = 53;
				var operand = '-';
				var result = calculationHelper.calculate(firstValue, secondValue, operand);

				expect(result).to.be.a('number');
				expect(result).to.equal(47);
			});
			it('should perform operation of multiplication of two values', function(){
				var firstValue = 50;
				var secondValue = 3;
				var operand = '*';
				var result = calculationHelper.calculate(firstValue, secondValue, operand);

				expect(result).to.be.a('number');
				expect(result).to.equal(150);
			});
			it('should perform operation of division of two values', function(){
				var firstValue = 121;
				var secondValue = 11;
				var operand = '/';
				var result = calculationHelper.calculate(firstValue, secondValue, operand);

				expect(result).to.be.a('number');
				expect(result).to.equal(11);
			});
		});
	});
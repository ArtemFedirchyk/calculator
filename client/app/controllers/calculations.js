import Ember from 'ember';

export default Ember.Controller.extend({
  inputValues: '',
  mathematicalSymbol: '',

  actions: {
    // Calls when one of 'Number's' buttoun is clicked
    setInputValue: function(inputValue) {
        if(this.get('resultValue') && (this.get('inputValues') === '') && (this.get('mathematicalSymbol') === '')){
          this.send('clear');
        }
       	this.set('inputValues', this.get('inputValues') + inputValue);
    },

    // Calls when on of 'Mathematical operator's' button is clicked, such as '+', '-', '*', '/'
    applyOperator: function(operator) {
      if ((this.get('resultValue') === undefined)){
        this.set('resultValue', this.get('inputValues'));
        this.set('inputValues', '');
        this.set('mathematicalSymbol', operator);
      }
      else if (this.get('resultValue') && this.get('mathematicalSymbol') && this.get('inputValues')){
        this.send('calculate');
        return;
      }
      this.set('mathematicalSymbol', operator);
    },

    // Calls when '=' button is clicked
    equals: function(){
        if (this.get('inputValues')){
          this.send('calculate');
        }
    },

    // Performs logic of mathematical actions with two incoming values
    calculate: function(){
      var parent = this;
      this.send('createNewCaulculationModel');
            
      Ember.run.later((function() {
        var calculations = parent.get('model');
        calculations.forEach(function(entry) {
          if((entry.get('firstValue') === parent.get('resultValue')) && (entry.get('secondValue') === parent.get('inputValues')) && (entry.get('operand') === parent.get('mathematicalSymbol'))){
            parent.set('resultValue', entry.get('result'));
            parent.set('inputValues', '');
            parent.set('mathematicalSymbol', '');
          }
        }); 
      }), 500);
    },

    // Cals when 'Clear' button is clicked and performs cleaning logic
    clear: function(){
      this.set('inputValues', '');
      this.set('mathematicalSymbol', '');
      this.set('resultValue', undefined);
    },

    // Creates new Calculation model and sets needed values for calculation proccess before sending JSON obj to server
    createNewCaulculationModel: function() {
      // Create the new Calculation model
      var calculation = this.store.createRecord('calculation', {
        firstValue: '',
        secondValue:'',
        operand: '',
        result: undefined
      }); 

      calculation.set('firstValue', this.get('resultValue'));
      calculation.set('secondValue', this.get('inputValues'));
      calculation.set('operand', this.get('mathematicalSymbol'));

      // Save the new model
      calculation.save();
    }
  }
});

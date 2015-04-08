import Ember from 'ember';
import functions from "simple-calculator/helpers/count-helper";

export default Ember.Controller.extend({
  inputValues: "",
  functions: functions,


  getfunctions: function(){
    return functions;
  },
  actions: {
    setInputValue: function(inputValue) {
        	this.set("inputValues", this.get("inputValues") + inputValue);
    },

    // Calls when on of 'Mathematical operator's' button is clicked, sucj as '+', '-', '*', '/'
    applyOperator: function(operator) {
      // var calculation = this.store.find('model');

      if (this.get("resultValue") === undefined){
        console.log("resultValue === undefined case");
        this.set("resultValue", parseFloat(this.get("inputValues")));
        this.set("inputValues", "");
        //calculation.set('firstVallue', this.get('resultValue'));
        //calculation.set('operand', operator);
        console.log('mathematicalSymbol is setting!!!');
        this.set("mathematicalSymbol", operator);
      }

      else if (this.get("mathematicalSymbol") && this.get("inputValues")){
      //   this.send("calculate");
      }

      this.set("mathematicalSymbol", operator);
    },

    // Calls when '=' button is clicked
    equals: function(){
      //--------------------------------------------------
      this.send('createNewCaulculationModel');
      console.log('Trying to take calculation models from store');
      var calculations = this.store.all('calculation');
      calculations.forEach(function(entry) {
        console.log(entry.get('result'));
      });
      console.log('Trying to take one calculation model from store\n');
      console.log(this.store.find('calculation', '552588cdf67cffc82d000004').get('result'));


      var calculation = this.store.find('calculation');

      this.set("resultValue", calculation.get('result'));
      //-------------------------------------------------
      if (this.get("inputValues")){
        //this.send("calculate");
        this.set("inputValues", "");
        this.set("mathematicalSymbol", "");
      }
    },

    // Performs logic of mathematical actions with two incoming values
    calculate: function(){
      //var result = this.get("functions")[this.get("mathematicalSymbol")](this.get("resultValue"), parseFloat(this.get("inputValues")));
      var calculation = this.get('model');
      calculation.set('secondValue', this.get('inputValues')); 
      calculation.save();
      this.set("resultValue", calculation.get('result'));
      this.set("inputValues", "");
    },

    // Cals when 'Clear' button is clicked and performs cleaning logic
    clear: function(){
      this.set("inputValues", "");
      this.set("mathematicalSymbol", "");
      this.set("resultValue", undefined);
    },

    createNewCaulculationModel: function() {
      // Create the new Calculation model
      var calculation = this.store.createRecord('calculation', {
        firstValue: '',
        secondValue:'',
        operand: '',
        result: 0
      });

      calculation.set('firstValue', this.get('resultValue'));
      calculation.set('secondValue', this.get('inputValues'));
      calculation.set('operand', this.get('mathematicalSymbol'));

      // Save the new model
      calculation.save();
      console.log('ID ----  ' + calculation.get('id'));
      this.store.all('calculation');
    }
  }
});

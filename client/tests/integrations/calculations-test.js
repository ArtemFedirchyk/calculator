import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'simple-calculator/tests/helpers/start-app';

var application;

module('Integration-testing: calculations actions', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting root "/" route', function(assert){
  assert.expect(1);
  visit('/');
  andThen(function(){
    assert.equal(currentPath(), 'calculations');
  });
});

test('cleaning display when "C" button is clicked', function(assert){
  assert.expect(3);
  visit('/');
  click('paper-button.button-1');
  click('paper-button.button-plus');
  click('paper-button.button-1');

  assert.equal(find('span.result-span').text().trim(), '');
  assert.equal(find('math-symbol-span').text().trim(), '');
  assert.equal(find('input-values-span').text().trim(), '');
});

// Here are integretion tests, for their correct results server should be in RUNING mode.
test('checking correct performing of addition operation', function(assert) {
  assert.expect(3);
  var done = assert.async();
  visit('/');
  // clicking corresponding buttons, which emulates next actions "11+23="
  click('paper-button.button-1');
  click('paper-button.button-1');
  click('paper-button.button-plus');
  click('paper-button.button-2');
  click('paper-button.button-3');
  click('paper-button.button-equals');

  // Sets some time out (in our case it's 500 ms) for async operations
  // Client-app should wait some time for receiving response which contains result from Server-app
  setTimeout(function() {
    andThen(function() {
      assert.equal(find('span.result-span').text().trim(), "34");
      assert.equal(find('math-symbol-span').text().trim(), '');
      assert.equal(find('input-values-span').text().trim(), '');
      done();
    });
  }, 500);
});


test('checking correct performing of subtraction operation', function(assert) {
  assert.expect(3);
  var done = assert.async();
  visit('/');

  click('paper-button.button-5');
  click('paper-button.button-1');
  click('paper-button.button-minus');
  click('paper-button.button-4');
  click('paper-button.button-7');
  click('paper-button.button-equals');

  setTimeout(function() {
    andThen(function() {
      assert.equal(find('span.result-span').text().trim(), "4");
      assert.equal(find('math-symbol-span').text().trim(), '');
      assert.equal(find('input-values-span').text().trim(), '');
      done();
    });
  }, 500);
});

test('checking correct performing of multiplication operation', function(assert) {
  assert.expect(3);
  var done = assert.async();
  visit('/');

  click('paper-button.button-5');
  click('paper-button.button-multiplication');
  click('paper-button.button-5');
  click('paper-button.button-equals');

  setTimeout(function() {
    andThen(function() {
      assert.equal(find('span.result-span').text().trim(), "25");
      assert.equal(find('math-symbol-span').text().trim(), '');
      assert.equal(find('input-values-span').text().trim(), '');
      done();
    });
  }, 500);
});

test('checking correct performing of division operation', function(assert) {
  assert.expect(3);
  var done = assert.async();
  visit('/');

  click('paper-button.button-5');
  click('paper-button.button-division');
  click('paper-button.button-2');
  click('paper-button.button-equals');

  setTimeout(function() {
    andThen(function() {
      assert.equal(find('span.result-span').text().trim(), "2.5");
      assert.equal(find('math-symbol-span').text().trim(), '');
      assert.equal(find('input-values-span').text().trim(), '');
      done();
    });
  }, 500);
});
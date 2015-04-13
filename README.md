## Simple calculator. Client - Ember.js, Polymer. Server - Node.js, Express, Mongoose 

## Setup:

* git clone https://github.com/ArtemFedirchyk/calculator.git
* using command prompt or terminal run
  * `cd client && npm install && bower install`
  * `cd server && npm install`

## How to run:

### Server

using command prompt or terminal run
* `node server.js`

### Client

using command prompt or terminal run
* `ember serve`

## How to run tests:
### Server

using command prompt or terminal
* inside <b>server</b> directory run `node server.js`
* using another command prompt or terminal run `mocha` inside <b>server</b> directory

### Client

* using command prompt or terminal run `ember serve` inside <b>client</b> directory
* using browser go to <b>http://localhost:4200/tests</b> and you should see performing integration tests. 

P.S. For correct executing integration tests for client-app note, that server-app shold be in RUNNING mode.




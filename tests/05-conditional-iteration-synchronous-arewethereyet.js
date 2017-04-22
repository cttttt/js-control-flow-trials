var tap = require('tap'),
    sinon = require('sinon'),
    poller = require('../trials/05-conditional-iteration-synchronous').poller;

var stillGoing = sinon.stub();
var numTruthies = Math.floor(Math.random() * 30) + 1;
for (var i=0; i<numTruthies; i++) {
    stillGoing.onCall(i).returns(true);
}
stillGoing.returns(false);

var doSomething = sinon.spy();
poller(stillGoing, doSomething);

tap.equals(stillGoing.callCount, numTruthies+1, 'Was stillGoing() called one time more than the number of times it returned true?');
tap.equals(doSomething.callCount, numTruthies, 'Was there a call to doSomething() for each time stillGoing() returned true?');

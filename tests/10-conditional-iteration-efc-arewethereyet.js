var tap = require('tap'),
    sinon = require('sinon'),
    poller = require('../trials/10-conditional-iteration-efc').poller;

var stillGoing = sinon.stub();
var numTruthies = Math.floor(Math.random() * 30);
for (var i=0; i<numTruthies; i++) {
    stillGoing.onCall(i).yields(null,true);
}
stillGoing.yields(null,false);

var doSomething = sinon.stub().yields();
var callback = sinon.stub();

poller(stillGoing, doSomething, callback);

tap.equals(stillGoing.callCount, numTruthies+1, 'Was stillGoing() called one time more than the number of times it returned true?');
tap.equals(doSomething.callCount, numTruthies, 'Was there a call to doSomething() for each time stillGoing() returned true?');
tap.equals(callback.callCount, 1, 'Was the callback called once?');
tap.ok(callback.calledAfter(stillGoing), 'Was the callback called after the first function?');
tap.ok(callback.calledAfter(doSomething), 'Was the callback called after the second function?');

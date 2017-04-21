var tap = require('tap'),
    sinon = require('sinon'),
    poller = require('../trials/20-conditional-iteration-async-await').poller;

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var stillGoing = sinon.stub();
var numTruthies = Math.floor(Math.random() * 30);
for (var i=0; i<numTruthies; i++) {
    stillGoing.onCall(i).resolves(true);
}
stillGoing.resolves(false);

var doSomething = sinon.stub().resolves();

var promise = poller(stillGoing, doSomething);

promise.then(() => {
    tap.equals(stillGoing.callCount, numTruthies+1, 'Was stillGoing() called one time more than the number of times it returned true?');
    tap.equals(doSomething.callCount, numTruthies, 'Was there a call to doSomething() for each time stillGoing() returned true?');
});

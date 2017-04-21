var tap = require('tap'),
    sinon = require('sinon'),
    simpleSequence = require('../trials/11-sequential-promises').simpleSequence,
    Promise = require('bluebird');

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var wait = () => Promise.delay(50);

var first = sinon.spy(wait);
    second = sinon.spy(wait);
    third = sinon.stub();

var startTime = Date.now();
var promise = simpleSequence(first, second, third);
tap.ok(promise, 'Was a promise returned?');
tap.ok(promise.then, 'Was a promise returned?');
promise.then(() => {
    var lapsedTime = Date.now() - startTime;

    tap.ok(lapsedTime >= 100, 'Did things take long enough (50ms * 2 calls)? i.e. Were the calls run sequentially?');
    tap.ok(third.calledAfter(second), 'Was the third function called after the second?');
    tap.ok(second.calledAfter(first), 'Was the second function called after the first?');
    tap.equal(first.callCount, 1, 'Was the first function called exactly once?');
    tap.equal(second.callCount, 1, 'Was the second function called exactly once?');
    tap.equal(third.callCount, 1, 'Was the third function called exactly once?');
});



var tap = require('tap'),
    sinon = require('sinon'),
    chainedSequence = require('../trials/16-sequential-async-await').chainedSequence;

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var first = sinon.stub().resolves(1),
    second = sinon.stub().resolves(2),
    third = sinon.stub();

var promise = chainedSequence(first, second, third);
tap.ok(promise, 'Was a promise returned?');
tap.ok(promise.then, 'Was a promise returned?');
promise.then(() => {
    tap.ok(third.calledAfter(second), 'Was the third function called after the second?');
    tap.ok(second.calledAfter(first), 'Was the second function called after the first?');
    tap.equal(first.callCount, 1, 'Was the first function called exactly once?');
    tap.equal(second.callCount, 1, 'Was the second function called exactly once?');
    tap.equal(third.callCount, 1, 'Was the third function called exactly once?');
    tap.ok(second.calledWith(1), 'Was the second function called with the result of the first?');
    tap.ok(third.calledWith(2), 'Was the third function called with the result of the second?');
});


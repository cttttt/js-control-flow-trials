var tap = require('tap'),
    sinon = require('sinon'),
    boolToString = require('../trials/12-branching-promises').boolToString;

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var randomBool = Math.random() > 0.5;
var randomBoolStub = sinon.stub().resolves(randomBool);
var promise = boolToString(randomBoolStub);

tap.ok(promise, 'Is the result a promise?');
tap.ok(promise.then, 'Is the result a promise?');

promise.then((r) => {
    tap.equals(randomBoolStub.callCount, 1, 'Was a randomBoolean fetched exactly once?');
    tap.equals(r, randomBool ? 'True' : 'False', 'Is the result expected?');
});

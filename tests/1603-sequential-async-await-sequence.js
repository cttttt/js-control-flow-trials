var tap = require('tap'),
    sinon = require('sinon'),
    sequence = require('../trials/16-sequential-async-await').sequence;

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var next = sinon.stub();
next
.onCall(0).resolves()
.onCall(1).resolves()
.onCall(2).resolves()
;

var promise = sequence(next);
tap.ok(promise, 'Was a promise returned?');
tap.ok(promise.then, 'Was a promise returned?');
promise.then(() => {
    tap.equal(next.callCount, 3, 'Was next() called exactly three times?');
    tap.deepEqual(next.args.map((a) => a[0]), [0,1,2], 'Was next() called with the numbers, 0, 1, and 2 in that order?');
});

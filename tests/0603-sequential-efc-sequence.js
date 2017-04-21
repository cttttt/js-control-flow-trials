var tap = require('tap'),
    sinon = require('sinon'),
    sequence = require('../trials/06-sequential-efc').sequence;

var next = sinon.stub().yields();
var callback = sinon.stub();

sequence(next, callback);

tap.equal(next.callCount, 3, 'Was next() called exactly three times?');
tap.equal(callback.callCount, 1, 'Was callback() called exactly once times?');
tap.ok(callback.calledAfter(next), 'Was callback() called after next()?');
tap.notOk(next.calledAfter(callback), 'Confirm that next() was never called after callback()?');
tap.deepEqual(next.args.map((a) => a[0]), [0,1,2], 'Was next() called with the numbers, 0, 1, and 2 in that order?');


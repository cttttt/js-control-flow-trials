var tap = require('tap'),
    sinon = require('sinon'),
    sequence = require('../trials/01-sequential-synchronous').sequence;

var spy = sinon.spy();
sequence(spy);
var args = spy.args.map((a) => a[0]);
tap.deepEqual(args, [0,1,2,3,4], 'Has the provided function been run with the numbers 0 through 4 in that order?');

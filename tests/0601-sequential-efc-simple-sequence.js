var tap = require('tap'),
    sinon = require('sinon'),
    simpleSequence = require('../trials/06-sequential-efc').simpleSequence;

var first = sinon.stub().yields(),
    second = sinon.stub().yields(),
    third = sinon.stub();

simpleSequence(first, second, third);

tap.ok(third.calledAfter(second), 'Was the third function called after the second?');
tap.ok(second.calledAfter(first), 'Was the second function called after the first?');
tap.equal(first.callCount, 1, 'Was the first function called exactly once?');
tap.equal(second.callCount, 1, 'Was the second function called exactly once?');
tap.equal(third.callCount, 1, 'Was the third function called exactly once?');


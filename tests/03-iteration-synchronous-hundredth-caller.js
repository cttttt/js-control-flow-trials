var tap = require('tap'),
    sinon = require('sinon'),
    hundredthCaller = require('../trials/03-iteration-synchronous').hundredthCaller;

var spy = sinon.spy();
hundredthCaller(spy);
var arguments = spy.args.map((a) => a[0]);
var expectedArgs = [];
for (var i=0; i<100; expectedArgs.push(i),i++)
    ;
tap.deepEquals(arguments, expectedArgs, 'Was the provided function called with the numbers from 0 through 99 in sequence?');

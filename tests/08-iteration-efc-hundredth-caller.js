var tap = require('tap'),
    sinon = require('sinon'),
    hundredthCaller = require('../trials/08-iteration-efc').hundredthCaller;

var stub = sinon.stub();
stub.yields();
var callback = sinon.spy();
hundredthCaller(stub, callback);
var arguments = stub.args.map((a) => a[0]);
var expectedArgs = [];
for (var i=0; i<100; expectedArgs.push(i),i++)
    ;
tap.deepEquals(arguments, expectedArgs, 'Was the provided function called with the numbers from 0 through 99 in sequence?');
tap.ok(callback.callCount, 1, 'Was the callback called exactly once?');

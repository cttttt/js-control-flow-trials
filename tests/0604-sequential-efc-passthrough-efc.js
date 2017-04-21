var tap = require('tap'),
    sinon = require('sinon'),
    passthrough = require('../trials/06-sequential-efc').passthrough;

var random = Math.floor(Math.random() * 10);
var stub = sinon.stub().yields(null, random);
var callback = sinon.stub();
passthrough(stub, callback);
tap.equals(stub.callCount, 1, 'Was the random value returning function called exactly once?');
tap.equals(callback.callCount, 1, 'Was the callback called exactly once?');
tap.equals(callback.firstCall.args[1], random, 'Was the callback called with the provided value?');

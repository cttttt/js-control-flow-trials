var tap = require('tap'),
    sinon = require('sinon'),
    boolToString = require('../trials/07-branching-efc').boolToString;

var randomBool = Math.random() > 0.5;
var randomBoolStub = sinon.stub().yields(null, randomBool);
var callback = sinon.stub();
boolToString(randomBoolStub, callback);

tap.equals(randomBoolStub.callCount, 1, 'Was a randomBoolean fetched exactly once?');
tap.equals(callback.callCount, 1, 'Was the callback called exactly once?');
tap.equals(callback.firstCall.args[1], randomBool ? 'True' : 'False', 'Did your function return "True" or "False" depending on the truthiness of the value it fetched?');

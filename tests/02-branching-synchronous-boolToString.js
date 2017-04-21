var tap = require('tap'),
    boolToString = require('../trials/02-branching-synchronous.js').boolToString,
    sinon = require('sinon');

var stub = sinon.stub(),
    randomBool = Math.random() > 0.5;
stub.returns(randomBool);
var result = boolToString(stub),
    expectedResult = randomBool ? "True" : "False";

tap.equal(result, expectedResult, 'Is the result "True" or "False" depending on the random argument?');

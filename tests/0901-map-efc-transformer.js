var tap = require('tap'),
    sinon = require('sinon'),
    transformer = require('../trials/09-map-efc').transformer,
    async = require('async');

var callback = sinon.stub();
var double = function (i, callback) {
    callback(null, i*2);
};
var spy = sinon.spy(double);
var list = [];
for(var i=0; i<100; i++) {
    list[i] = i;
}
var expectedResult = [];
for(var i=0; i<100; i++) {
    expectedResult[i] = i*2;
}

sinon.spy(async, 'map');
transformer(list, double, callback);
tap.ok(async.map.notCalled, 'Confirm that async.map was not used');
tap.deepEquals(callback.callCount, 1, 'Was the callback called once?');
tap.deepEquals(callback.firstCall.args[1], expectedResult, 'Did the call return a properly transformed array?');
async.map.restore();

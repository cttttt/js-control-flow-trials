var tap = require('tap'),
    sinon = require('sinon'),
    transformer = require('../trials/14-map-promises').transformerBluebirdMap;

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var callback = sinon.stub();
var double = function (i) {
    return new Promise((resolve) => resolve(i*2));
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

var promise = transformer(list, double, callback);

promise.then((r) => {
    tap.deepEquals(r, expectedResult, 'Did the call return a properly transformed array?');
});

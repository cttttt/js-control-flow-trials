var tap = require('tap'),
    sinon = require('sinon'),
    hundredthCaller = require('../trials/18-iteration-async-await').hundredthCaller,
    Promise = require('bluebird');

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var stub = () => Promise.delay(10);
var spy = sinon.spy(stub);
var startTime = Date.now();
var promise = hundredthCaller(spy);

tap.ok(promise, 'Is a promise returned?');
tap.ok(promise.then, 'Is a promise.returned?');
promise.then(function () {
    var lapsedTime = Date.now() - startTime;
    tap.ok(lapsedTime > 1000, 'Did the function take long enough (> 10ms * 100 iterations = 1s)? i.e. Were calls run sequentially?');
    var args = spy.args.map((a) => a[0]);
    var expectedArgs = [];
    for (var i=0; i<100; expectedArgs.push(i),i++)
        ;
    tap.deepEquals(args, expectedArgs, 'Was the provided function called with the numbers from 0 through 99 in sequence?');
});

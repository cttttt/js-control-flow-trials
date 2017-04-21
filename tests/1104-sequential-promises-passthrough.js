var tap = require('tap'),
    sinon = require('sinon'),
    passthrough = require('../trials/11-sequential-promises').passthrough;

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var random = Math.floor(Math.random() * 10);
var stub = sinon.stub().resolves(random);
var promise = passthrough(stub);
tap.ok(promise, 'Was a promise returned?');
tap.ok(promise.then, 'Was a promise returned?');
promise.then((r) => {
    tap.equals(r, random, 'Is the result what we passed to passthrough()?');
});

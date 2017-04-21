var tap = require('tap'),
    sinon = require('sinon'),
    passthroughAnEfc = require('../trials/11-sequential-promises').passthroughAnEfc;

process.on('uncaughtException', tap.threw).on('unhandledRejection', tap.threw);

var random = Math.floor(Math.random() * 10);
var stub = sinon.stub().yields(null, random);
passthroughAnEfc(stub).then((r) => {
    tap.equals(r, random, 'Is the result what we passed to passthrough()?');
});

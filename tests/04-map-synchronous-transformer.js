var tap = require('tap'),
    sinon = require('sinon'),
    transformer = require('../trials/04-map-synchronous').transformer;

var list = [];
for (var i=0; i<100; i++) {
    list.push(i);
}

var expectedList = [];
for (var i=0; i<100; i++) {
    expectedList.push(i*2);
}

var double = (i) => i*2;

var mapSpy = sinon.spy(list, 'map');

var result = transformer(list, double);

tap.deepEqual(result, expectedList, 'Does the resulting list contain the results of running transform() on each element?');
tap.ok(mapSpy.called, 'Was .map() called on the provided list?');

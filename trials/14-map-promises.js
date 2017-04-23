// Create an error-first-callback function that takes a list, a
// transform function and a callback function.  "Return" (through the
// callback) an array with elements each created by running the
// transform function on the original list's elements.
//
// Do not use Bluebird's Promise.map().
//
//
// THIS IS DIFFICULT!!!!
module.exports.transformer = function (list, transform) {
    var result = [];
    return list.reduce(
        (previous, next, i) => 
            previous
            .then(() => transform(list[i])) 
            .then(r => result[i] = r
        ), Promise.resolve(0)
    ).then(() => result);
}

// Create an error-first-callback function that takes a list, a
// transform function and a callback function.  "Return" an array with
// elements each created by running the transform function on the
// original list's elements.
//
// Here, feel free to use Bluebird's Promise.map().
//
var Promise = require('bluebird');
module.exports.transformerBluebirdMap = function (list, transform) {
    return Promise.map(list, transform);
}

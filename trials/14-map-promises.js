// Create an error-first-callback function that takes a list, a transform
// function and a callback function.  "Return" (through the callback) an array
// with elements each created by running the transform function on the original
// list's elements.
//
// Do not use async.map.
//
//
// THIS IS DIFFICULT!!!!
module.exports.transformer = function (list, transform) {
}

// Create an error-first-callback function that takes a list, a transform
// function and a callback function.  "Return" (through the callback) an array
// with elements each created by running the transform function on the original
// list's elements.
//
// Here, feel free to use async.map
//
var Promise = require('bluebird');
module.exports.transformerBluebirdMap = function (list, transform, callback) {
}

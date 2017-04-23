// Create an error-first-callback function that takes a list, a transform
// function and a callback function.  "Return" (through the callback) an array
// with elements each created by running the transform function on the original
// list's elements.
//
// Do not use async.map.
//
module.exports.transformer = function (list, transform, callback) {
    var result = [], numResults=0;
    
    for (var i=0; i<list.length; i++) {
        transform(list[i], (err, r) => {
            result[i] = r;
            numResults++;

            if (numResults === list.length) {
                callback(null, result);
            }
        });
    }
}

// Create an error-first-callback function that takes a list, a transform
// function and a callback function.  "Return" (through the callback) an array
// with elements each created by running the transform function on the original
// list's elements.
//
// Here, feel free to use async.map
//
var async = require('async');
module.exports.transformerAsyncMap = function (list, transform, callback) {
    async.map(list, transform, callback);
}

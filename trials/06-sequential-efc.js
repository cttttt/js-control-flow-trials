// Create an error first callback function that accepts two
// error-first-callback functions and a callback.  Call the first, then the
// second, then the third, in order.
//
module.exports.simpleSequence = function(first, second, callback) {
    first((e, r) => second((e, r) => callback()));
};

// Create an error first callback function that accepts two
// error-first-callback functions and a callback.  The two
// error-first-callback functions "return" values.  Call the first, then the
// second with the result of the first, then return the result of the
// second via the callback.
module.exports.chainedSequence = function(first, second, callback) {
    first((e, r1) => second(r1, (e, r2) => callback(null, r2)));
};

// Create an error first callback function that accepts two functions: An error
// first callback function, and a callback. Call the first function three times
// with the numbers, 0 through 2, then the callback, in sequence.
module.exports.sequence = function (next, callback) {
    next(0, () => next(1, () => next(2, () => callback())));
};

// Create an error first callback function that accepts a number and a
// callback.  "return" the number via the callback.
module.exports.passthrough = function (randomNumGenerator, callback) {
    randomNumGenerator((err, r) => callback(null, r));
};


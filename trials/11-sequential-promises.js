// write a promise returning function that accepts three promise returning
// functions. Call them in order.
module.exports.simpleSequence = function (first, second, third) {
};

// write a promise returning function that accepts three promise returning
// functions. Call each one with the result of the previous function.
module.exports.chainedSequence = function (first, second, third) {
};

// write a promise returning function that accepts a promise returning
// function, and calls this function with 0, 1, then, 2 in sequence.
module.exports.sequence = function (next) {
};

// write a promise-returning function that accepts a promise returning
// function, and "returns" whatever this function resolves to.
module.exports.passthrough = function (next) {
};

// write a promise-returning function that accepts an error-first-callback
// function, and "returns" whatever this function "returns".
//
// effectively, make a promise returning function that proxies
// anerror-first-callback function.
module.exports.passthroughAnEfc = function (nextEfc) {
};

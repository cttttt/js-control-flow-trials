// write a promise returning function that accepts three promise returning
// functions. Call them in order.
module.exports.simpleSequence = async function (first, second, third) {
};

// write a promise returning function that accepts three promise returning
// functions. Call each one with the result of the previous function.
module.exports.chainedSequence = async function (first, second, third) {
};

// write a promise returning function that accepts a promise returning
// function, and calls this function with 0, 1, then, 2 in sequence.
module.exports.sequence = async function (next) {
};


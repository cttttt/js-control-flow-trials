// Write a synchronous function that accepts another synchronous function.
// Call this other function with the numbers, 0 through 99 in order.
module.exports.hundredthCaller = function (next) {
    for (var i=0; i<100; i++) {
        next(i);
    }
};

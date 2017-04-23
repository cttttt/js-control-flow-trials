// Write a synchronous function that accepts another function.  Call this other
// function with the numbers 0 through 4 in order.
module.exports.sequence = function (next) {
    next(0);
    next(1);
    next(2);
    next(3);
    next(4);
}

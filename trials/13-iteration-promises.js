// Write a promise returning function that accepts a promise returning function
// and runs it with the numbers, 1 through 100 in order.
//
module.exports.hundredthCaller = function (next) {
    return (function helper(i, next) {
        if (i<100) {
            return next(i).then(() => helper(i+1, next));
        }
    })(0, next);
};

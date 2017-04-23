// Given an error first callback function, 'next' and a callback, call
// next() 100 times with values 0 through 99 in that order and
// sequentially.  When you're done, call callback.
//
module.exports.hundredthCaller = function (next, callback) {
    (function helper(i, next, callback) {
        if (i<100) {
            next(i, () => helper(i+1, next, callback))
        } else {
            callback();
        }
    })(0, next, callback)
}

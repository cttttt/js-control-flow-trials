// Write a function that accepts two synchronous functions:  One, thereYet()
// that returns a boolean value and another, nope() that's just a random
// function. Call thereYet() repeatedly until it returns a falsey value.  Every
// time it returns a truthey value, call nope().
module.exports.poller = function (thereYet, nope) {
    while (thereYet()) {
        nope();
    }
}

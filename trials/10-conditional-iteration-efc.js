// Write an error-first-callback function that accepts two
// error-first-callback functions and a callback.  Repeatedly call
// the first one, and every time it returns something truthy, call
// the second.  When the first one returns something falsey,
// "return" by calling the callback.
//
// i.e. Implement trials/05-conditional-iteration-synchronous.js as
// an error-first-callback function that accepts
// error-first-callback functions.
//
module.exports.poller = function poller(areWeThere, nope, callback) {
    areWeThere((err, notYet) => {
        if (notYet) {
            nope(() => {
                poller(areWeThere, nope, callback);
            });
        } else {
            callback();
        }
    });
};

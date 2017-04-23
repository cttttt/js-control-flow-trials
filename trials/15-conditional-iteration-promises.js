// Create a function that takes two  promise returning functions,
// areWeThere and nope.
//
// Call areWeThere() repeatedly until it "returns" something falsey,
// then stop iterating.
//
// As an added wrinkle, every time areWeThereYet() "returns" something
// truthy, call "nope()" __then__ call areWeThere() again.
//
// In other words:
//
// call areWeThere()
//
// if (the result is truthy) {
//  call nope()
// }
//
// callAreThere()
//
// if (the result is truthy) {
//   call nope()
// }
//
// ...
// ...
// ...
//
// But note that all of the functions involved are promise-returning.
module.exports.poller = function poller(areWeThere, nope) {
    return areWeThere()
    .then(notYet => 
            notYet ? 
            nope().then(() => poller(areWeThere, nope)) : null
    );
};

// Create an async function that takes two promise returning functions, areWeThere
// and nope.
//
// Call areWeThere() repeatedly until it returns something falsey,
// then stop iterating.
//
// As an added wrinkle, every time areWeThereYet() "returns" something truthy,
// call "nope()" __then__ call areWeThere() again.
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
module.exports.poller = async function poller(areWeThere, nope) {
    while (await areWeThere()) {
        await nope();
    }
};

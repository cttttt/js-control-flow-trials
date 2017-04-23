// Write a promise-returning function that accepts a promise retruning
// function, getNextBool. getNextBool() will "return" a random boolean
// value.  Retrieve it and "return" the string, "True" or "False"
// depending on the truthiness of the value.
//
module.exports.boolToString = function (getNextBool) {
    return getNextBool().then(r=>r?"True":"False");
};

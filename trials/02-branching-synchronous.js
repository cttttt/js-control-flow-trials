// Write a function that accepts a synchronous function that returns a
// random.  If the value is truthy, return the string "True".   If it's
// falsey, return the string "False"
module.exports.boolToString = function (getNext) {
    return getNext() ? 'True' : 'False';
}

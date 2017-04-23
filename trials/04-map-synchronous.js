// Write a function that takes a list and another function (a transformer).
// Return the list composed of the results of running each element of the given
// list through the transformer function.
//
module.exports.transformer = function (list, transform) {
    return list.map(transform);
}

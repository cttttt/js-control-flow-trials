// Create an async function that takes a Promise returning function.  Run the
// promise returning function and "return" "True" or "False" depending on its
// truthiness.
module.exports.boolToString = async function (getNextBool) {
    return await getNextBool() ? "True": "False";
};

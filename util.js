module.exports = {
    isBetween: function(num, a, b) {
        return a < +num && +num < b;
    },
    isBetweenIncludes: function(num, a, b) {
        return a <= +num && +num <= b;
    }
}
/**
 * Created by Stijn on 01/03/16.
 */
var Range = Object.create({
    min: 0,
    max: 0,
    delta: function () {
        return this.max - this.min;
    },
    init: function (min, max) {
        this.min = min;
        this.max = max;
        return this;
    }
});

module.exports = Range;
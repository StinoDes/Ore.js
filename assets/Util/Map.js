/**
 * Created by Stijn on 01/03/16.
 */
var Map = Object.create({
    domain: null,
    range: null,
    init: function (domain, range) {
        if (typeof domain.delta == 'function') {
            this.domain = domain;
        }
        else if (typeof domain.length != 'undefined') {
            this.domain = EZI.createRange(domain[0], domain[1]);
        }
        else {
            this.domain = EZI.createRange(0, domain);
        }
        if (typeof range.delta == 'function') {
            this.range = range;
        }
        else if (typeof range.length != 'undefined') {
            this.range = EZI.createRange(range[0], range[1]);
        }
        else {
            this.range = EZI.createRange(0, range);
        }
        return this;
    },
    calc: function (num) {
        if (num < this.domain.min || num > this.domain.max)
            return null;
        var t = (num - this.domain.min) / this.domain.delta();
        return t * this.range.delta() + this.range.min;
    }
});
module.exports = Map;
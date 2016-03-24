/**
 * Created by Stijn on 01/03/16.
 */
var Easings = Object.create({

    LINEAR: 'linear',
    EASEINQUAD: 'easeinquad',
    EASEOUTQUAD: 'easeoutquad',
    EASEINOUTQUAD: 'easeinoutquad',
    EASEINCUBIC: 'easeincubic',
    EASEOUTCUBIC: 'easeoutcubic',
    EASEINOUTCUBIC: 'easeinoutcubic',
    EASEINQUART: 'easeinquart',
    EASEOUTQUART: 'easeoutquart',
    EASEINOUTQUART: 'easeinoutquart',
    EASEINQUINT: 'easeinquint',
    EASEOUTQUINT: 'easeoutquint',
    EASEINOUTQUINT: 'easeinoutquint',
    BOUNCEIN: 'bouncein',
    BOUNCEOUT: 'bounceout',
    DEFAULT: 'linear',


    default: 'linear',

    linear: function (t) { return t },

    easeinquad: function (t) { return t*t },

    easeoutquad: function (t) { return t*(2-t) },

    easeinoutquad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

    easeincubic: function (t) { return t*t*t },

    easeoutcubic: function (t) { return (--t)*t*t+1 },

    easeinoutcubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

    easeinquart: function (t) { return t*t*t*t },

    easeoutquart: function (t) { return 1-(--t)*t*t*t },

    easeinoutquart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

    easeinquint: function (t) { return t*t*t*t*t },

    easeoutquint: function (t) { return 1+(--t)*t*t*t*t },

    easeinoutquint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

    /*makeEaseOut: function (deltafunc) {
     return function (p) {
     return 1 - deltafunc(1 - p);
     }
     },*/
    bouncein: function (p) {
        for(var a = 0, b = 1; ; a += b, b /= 2) {
            if (p >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * p) / 4, 2) + Math.pow(b, 2);
            }
        }
    },
    bounceout: function (p) {
        return 1 - this.bouncein(1 - p);
    },


});

module.exports = Easings;
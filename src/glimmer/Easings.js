export default function (Class) {
    return Class.extend({
        LINEAR: '_linear',
        EASEINQUAD: '_easeinquad',
        EASEOUTQUAD: '_easeoutquad',
        EASEINOUTQUAD: '_easeinoutquad',
        EASEINCUBIC: '_easeincubic',
        EASEOUTCUBIC: '_easeoutcubic',
        EASEINOUTCUBIC: '_easeinoutcubic',
        EASEINQUART: '_easeinquart',
        EASEOUTQUART: '_easeoutquart',
        EASEINOUTQUART: '_easeinoutquart',
        EASEINQUINT: '_easeinquint',
        EASEOUTQUINT: '_easeoutquint',
        EASEINOUTQUINT: '_easeinoutquint',
        BOUNCEIN: '_bouncein',
        BOUNCEOUT: '_bounceout',
        DEFAULT: '_linear',
        default: '_linear',
        _linear: {
            value (t) {
                return t
            },
            editable: false,
            visible: false
        },
        _easeinquad: {
            value (t) {
                return t * t
            },
            editable: false,
            visible: false
        },
        _easeoutquad: {
            value (t) {
                return t * (2 - t)
            },
            editable: false,
            visible: false
        },
        _easeinoutquad: {
            value (t) {
                return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            },
            editable: false,
            visible: false
        },
        _easeincubic: {
            value (t) {
                return t * t * t
            },
            editable: false,
            visible: false
        },
        _easeoutcubic: {
            value (t) {
                return (--t) * t * t + 1
            },
            editable: false,
            visible: false
        },
        _easeinoutcubic: {
            value (t) {
                return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            },
            editable: false,
            visible: false
        },
        _easeinquart: {
            value (t) {
                return t * t * t * t
            },
            editable: false,
            visible: false
        },
        _easeoutquart: {
            value (t) {
                return 1 - (--t) * t * t * t
            },
            editable: false,
            visible: false
        },
        _easeinoutquart: {
            value (t) {
                return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
            },
            editable: false,
            visible: false
        },
        _easeinquint: {
            value(t) {
                return t * t * t * t * t
            },
            editable: false,
            visible: false
        },
        _easeoutquint: {
            value (t) {
                return 1 + (--t) * t * t * t * t
            },
            editable: false,
            visible: false
        },
        _easeinoutquint: {
            value (t) {
                return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
            },
            editable: false,
            visible: false
        },
        _bouncein: {
            value(p) {
                for (var a = 0, b = 1; ; a += b, b /= 2) {
                    if (p >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * p) / 4, 2) + Math.pow(b, 2);
                    }
                }
            },
            editable: false,
            visible: false
        },
        _bounceout: {
            value(p) {
                return 1 - this._bouncein(1 - p);
            },
            editable: false,
            visible: false
        }
    });
}
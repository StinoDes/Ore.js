const easings = (() => {
  const obj = {
    LINEAR         : '_linear',
    EASEINQUAD     : '_easeinquad',
    EASEOUTQUAD    : '_easeoutquad',
    EASEINOUTQUAD  : '_easeinoutquad',
    EASEINCUBIC    : '_easeincubic',
    EASEOUTCUBIC   : '_easeoutcubic',
    EASEINOUTCUBIC : '_easeinoutcubic',
    EASEINQUART    : '_easeinquart',
    EASEOUTQUART   : '_easeoutquart',
    EASEINOUTQUART : '_easeinoutquart',
    EASEINQUINT    : '_easeinquint',
    EASEOUTQUINT   : '_easeoutquint',
    EASEINOUTQUINT : '_easeinoutquint',
    BOUNCEIN       : '_bouncein',
    BOUNCEOUT      : '_bounceout',
    DEFAULT        : '_linear',
    default        : '_linear',

    _linear (t) {
      return t
    },
    _easeinquad (t) {
      return t * t
    },
    _easeoutquad (t) {
      return t * (2 - t)
    },
    _easeinoutquad (t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    _easeincubic (t) {
      return t * t * t
    },
    _easeoutcubic (t) {
      return (--t) * t * t + 1
    },
    _easeinoutcubic (t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    _easeinquart (t) {
      return t * t * t * t
    },
    _easeoutquart (t) {
      return 1 - (--t) * t * t * t
    },
    _easeinoutquart (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    },
    _easeinquint (t) {
      return t * t * t * t * t
    },
    _easeoutquint (t) {
      return 1 + (--t) * t * t * t * t
    },
    _easeinoutquint (t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    },
    _bouncein (p) {
      for (let a = 0, b = 1; ; a += b, b /= 2)
        if (p >= (7 - 4 * a) / 11)
          return -Math.pow((11 - 6 * a - 11 * p) / 4, 2) + Math.pow(b, 2)
    },
    _bounceout (p) {
      return 1 - this._bouncein(1 - p)
    },
  }

  return (p, name) => obj[obj[name.toUpperCase()]](p)
})()

export default easings

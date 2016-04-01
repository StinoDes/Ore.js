var Transformer = Object.create({
    TRANSFORMS: ['scale', 'translate', 'rotate'],
    PREFIXES: ['o', 'ms', 'moz', 'webkit'],
    DEFAULTS: {
        'scale': [1, 1, 1],
        'translate': [0, 0, 0],
        'rotate': [0]
    },
    init: function () {
        //X, Y, Z for each transform
        for (var k in this.TRANSFORMS) {
                this[this.TRANSFORMS[k]] = this.DEFAULTS[this.TRANSFORMS[k]];
        }
        this.translateUnit = 'px';
        return this;
    },
    setTransform: function (transform, par1, par2, par3) {
        if (par1.length === undefined) {
            var arr = Array.prototype.slice.call(arguments);
            arr = arr.slice(1);
            for (var k in arr) {
                if (arr[k] !== undefined)
                    this[transform][k] = arr[k];
            }
        }
        else {
            this[transform] = par1;
        }
    },
    getTransform: function (transformName) {
        return this[transformName];
    },
    getTransformString: function (includeNulls) {
        var str = "";
        for (var k in this.TRANSFORMS) {
            if (includeNulls)
                str += this.getTransformPart(this.TRANSFORMS[k]);
            else if (this[this.TRANSFORMS[k]] !== this.DEFAULTS[this.TRANSFORMS[k]]) {
                str += this.getTransformPart(this.TRANSFORMS[k]);
            }
            //str += '';
            //if (k >= this.TRANSFORMS.length-1) {
            //    str = str.substr(0, str.length-2);
            //}
        }
        return str;
    },
    transformElement: function (eziEl, includeNulls) {
        var string = this.getTransformString(includeNulls || false);
        eziEl.element.style['transform'] = string;
        for (var k in this.PREFIXES) {
            eziEl.element.style['-'+this.PREFIXES[k]+'-transform'] = string;
        }
    },
    getTransformPart: function (transformName) {
        var transform = this[transformName],
            str = '',
            is3d = transform[2] !== 0;
        if (is3d) {
            str += transformName + '3d(';
            for (var l in transform) {
                str += transform[l];
                if (transformName === 'translate')
                    str += this.translateUnit;
                if (transformName === 'rotate')
                    str += 'deg';
                str += ',';
            }
        }
        else {
            str += transformName + '(';
            if (transformName === 'rotate')
                str += transform[0] + 'deg';
            else {
                for (var l in transform) {
                    if (l < 2) {
                        str += transform[l];
                        if (transformName === 'translate')
                            str += this.translateUnit;
                        str += ',';
                    }
                }
            }
        }
        if (str[str.length-1] === ',')
            str = str.substr(0, str.length-1);
        str+= ') ';
        return str;
    },
    createTransformAnimation: function (name, valueArray, easing) {
        easing = (easing !== undefined)?easing:EZI.Easings.DEFAULT;
        var transformAnimation = Object.create(require('../AniManager/TransformAnimation.js')).init(name, valueArray, easing,this);
        return transformAnimation;
    }

});

module.exports = Transformer;
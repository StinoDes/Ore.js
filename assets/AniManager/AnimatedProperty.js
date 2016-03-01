/**
 * Created by Stijn on 01/03/16.
 */

var AnimatedProperty = Object.create({

    //constant
    TRANSFORMS: ['scale', 'horizontal-translate', 'vertical-translate', 'rotate'],
    mustUpdate: false,
    animationId: null,
    propertyName: null,
    startValue: null,
    endValue: null,
    deltaValue: function () {return this.endValue - this.startValue;},
    easing: null,
    unit: 'px',

    id: 0,

    init: function (propertyName) {

        if (arguments.length == 2) {

            this.endValue = arguments[1];
            this.easing = 'DEFAULT';
            this.startValue = null; //TODO

        }
        else if (arguments.length == 3) {

            this.endValue = arguments[1];
            this.easing = arguments[2];
            this.startValue = null; //TODO

        }
        else if (arguments.length == 4) {

            this.startValue = arguments[1];
            this.endValue = arguments[2];
            this.easing = arguments[3];

        }

        this.propertyName = propertyName;
        this.id = Math.random();
        this.unit = EZI.CSSProps.getPropertyObject(this.propertyName).defaultUnit;

        return this;

    },
    getStyleString: function (t) {

        if (this.isTransform()) {

            if (this.propertyName != this.TRANSFORMS[1] && this.propertyName != this.TRANSFORMS[2]) {
                return this.propertyName+"("+ (this.startValue + this.deltaValue() * EZI.Easing[this.easing](t)) + this.unit+")";
            }
            else if (this.propertyName == this.TRANSFORMS[1]) {
                return "translate("+(this.startValue + this.deltaValue() * EZI.Easing[this.easing](t)) + this.unit+",0)";
            }
            else if (this.propertyName == this.TRANSFORMS[2]) {
                return "translate(0,"+(this.startValue + this.deltaValue() * EZI.Easing[this.easing](t)) + this.unit+")";
            }

        }
        else {

            return this.startValue + this.deltaValue() * EZI.Easing[this.easing](t) + this.unit;

        }

    },
    isTransform: function () {
        return this.TRANSFORMS.indexOf(this.propertyName) > -1;
    },
    switchValues: function () {
        var end = this.startValue;
        var st = this.endValue;
        this.endValue = end;
        this.startValue = st;
    }

});

module.exports = AnimatedProperty;

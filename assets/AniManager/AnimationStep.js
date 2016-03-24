/**
 * Created by Stijn on 01/03/16.
 */
var AnimationStep = Object.create(require('./AnimatedProperty'), {

    startTime: {
        writable: true,
        readable: true,
        value: null
    },
    endTime: {
        writable: true,
        readable: true,
        value: null
    }

});

AnimationStep.init = function (propertyName) {

    if (arguments.length == 2) {

        this.endValue = arguments[1];
        this.easing = 'DEFAULT';
        this.startValue = null; //TODO
        this.startTime = null;
        this.endTime = null;

    }
    else if (arguments.length == 3) {

        this.endValue = arguments[1];
        this.easing = arguments[2];
        this.startValue = null; //TODO
        this.startTime = null;
        this.endTime = null;

    }
    else if (arguments.length == 4) {

        this.startValue = arguments[1];
        this.endValue = arguments[2];
        this.easing = arguments[3];
        this.startTime = null;
        this.endTime = null;

    }
    else if (arguments.length == 6) {

        this.startValue = arguments[1];
        this.endValue = arguments[2];
        this.easing = arguments[5];
        this.startTime = arguments[3];
        this.endTime = arguments[4];

    }

    this.propertyName = propertyName;
    this.id = Math.random();

    return this;

};

AnimationStep.getStyleString = function (t) {

    t = this.remapProgress(t);

    if (this.isTransform()) {

        if (this.propertyName != this.TRANSFORMS[1] && this.propertyName != this.TRANSFORMS[2]) {
            return this.propertyName+"("+ (this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+")";
        }
        else if (this.propertyName == this.TRANSFORMS[1]) {
            return "translate("+(this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+",0)";
        }
        else if (this.propertyName == this.TRANSFORMS[2]) {
            return "translate(0,"+(this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+")";
        }

    }
    else {
        return (this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit;

    }
};
AnimationStep.remapProgress = function (t) {

    t -= this.startTime;
    var deltaT = this.endTime - this.startTime;
    t *= (1 / deltaT);
    if (t > 1) t = this.endTime;
    return t;

};
AnimationStep.switchValues = function () {
    var end = this.startValue;
    var st = this.endValue;
    this.endValue = end;
    this.startValue = st;

    var deltaT = this.endTime - this.startTime;
    var startTime = 1 - this.endTime;
    var endTime = startTime + deltaT;

    this.startTime = startTime;
    this.endTime = endTime;
}


module.exports = AnimationStep;
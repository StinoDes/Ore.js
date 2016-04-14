/**
 * Created by Stijn on 26/03/16.
 */
/**
 * Created by Stijn on 01/03/16.
 */

var AnimatedProperty = Object.create({

    //constant
    TRANSFORMS: ['scale', 'horizontal-translate', 'vertical-translate', 'rotate'],
    mustUpdate: false,
    animationId: null,
    propertyName: null,
    startValues: null,
    endValues: null,
    easing: null,
    unit: 'px',

    id: 0,

    init: function (transformName, valueArray, easing, transformer) {
        this.includeNulls = false;
        this.propertyName = 'transform';
        this.transformer = transformer;
        this.easing = easing;
        this.startValues = {
            'scale': transformer.getTransform('scale'),
            'translate': transformer.getTransform('translate'),
            'rotate': transformer.getTransform('rotate')
        };
        this.endValues = {};
        this.endValues[transformName] = valueArray;
        this.id = Math.random();

        return this;

    },
    assignTransforms: function (progress) {
        for (var k in this.endValues) {
            var trnsfrm = k,
                delta = [],
                values = [];
            for (var l in this.endValues[trnsfrm]) {
                delta[l] = this.endValues[trnsfrm][l] - this.startValues[trnsfrm][l];
                values[l] = this.startValues[trnsfrm][l] + delta[l]  * EZI.Easings[this.easing](progress);
            }
            this.transformer.setTransform(k, values);
        }
    },
    getStyleString: function () {

        return this.transformer.getStyleString(false);

    },
    switchValues: function () {
        var end = this.startValue;
        var st = this.endValue;
        this.endValue = end;
        this.startValue = st;
    },
    isTransform: function () {
        return true;
    }

});

module.exports = AnimatedProperty;


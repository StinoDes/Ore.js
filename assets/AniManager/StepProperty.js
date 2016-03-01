/**
 * Created by Stijn on 01/03/16.
 */

var StepProperty = Object.create({

    //constant
    TRANSFORMS: ['scale', 'horizontal-translate', 'vertical-translate', 'rotate'],
    mustUpdate: true,

    propertyName: '',
    steps: [],
    curStep: 0,

    id: '',

    init: function (name) {

        this.propertyName = name;

        for (var i = 1; i < arguments.length; i++) {
            this.steps.push(arguments[i]);
            if (i == 1) {
                this.propertyName = this.steps[i-1].propertyName;
            }
        }

        return this;

    },
    update: function (t) {
        if (t >= this.curProperty().endTime) {

            this.curStep++;
            if (this.curStep >= this.steps.length) {
                this.propertyName == '';
            }
            else {
                this.propertyName = this.curProperty().propertyName;
            }

        }
    },
    reset: function () {
        this.curStep = 0;
        this.propertyName = this.curProperty().propertyName;
    },
    isTransform: function () {
        return this.curProperty().isTransform();
    },
    addAnimationStep: function (step) {
        this.steps.push(step);
        if (this.steps.length == 1) {
            this.propertyName = this.steps[0].propertyName;
        }

    },
    curProperty: function () {
        return this.steps[this.curStep];
    },

    getStyleString: function (t) {
        if (typeof this.curProperty() != 'undefined')
            return this.curProperty().getStyleString(t);
    },
    switchValues: function (t) {

        var ar = this.steps;

        for (var i = 0; i < ar.length; i++) {
            this.steps[i] = ar[ar.length - 1 - i];
            this.steps[i].switchValues();
        }

    }


});

module.exports = StepProperty;
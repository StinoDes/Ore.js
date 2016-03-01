/**
 * Created by Stijn on 01/03/16.
 */
var Animation = Object.create({

    //TYPE CONSTANTS
    ONCE: 'once',
    TOGGLE: 'toggle',
    RETURN: 'return',
    LOOP: 'loop',
    LOOPBACK: 'loopback',

    identifier: null,
    properties: [],
    element: null,
    duration: null,
    curTime: 0,
    autoRemove: true,
    toggle: false,
    repeat: false,
    type: this.ONCE,
    callback: function () {},

    animate: false,

    toggleDisplay: false,
    hasToggledDisplay: false,

    id: 0,

    init: function (element, duration, callback) {

        this.identifier = null;
        this.element = element;
        this.duration = duration;
        this.id = Math.random();
        this.callback = (typeof callback != "undefined") ? callback: this.callback;
        this.properties = [];

        return this;

    },

    draw: function () {

        if (this.animate) {

            if (this.curTime == 0 && this.toggleDisplay && EZ(this.element).isHidden() && !this.hasToggledDisplay) {
                EZ(this.element).show();
                this.hasToggledDisplay = true;
            }

            this.curTime += EZI.AniManager.deltaTime;

            if (this.curTime > this.duration) this.curTime = this.duration;

            var progress = this.curTime / this.duration;

            for (var k in this.properties) {

                var property = this.properties[k];

                if (property.isTransform()) {
                    this.element.style.transform =
                        property.getStyleString(progress);
                    this.element.style.webkitTransform =
                        property.getStyleString(progress);
                    this.element.style.mozTransform =
                        property.getStyleString(progress);
                    this.element.style.msTransform =
                        property.getStyleString(progress);
                    this.element.style.oTransform =
                        property.getStyleString(progress);
                }
                else {
                    if (property.mustUpdate) {
                        property.update(progress);
                    }
                    this.element.style[property.propertyName] =
                        property.getStyleString(progress);
                }

            }

            if (this.curTime >= this.duration) {
                if (this.toggleDisplay && !EZ(this.element).isHidden() && !this.hasToggledDisplay) {
                    !EZ(this.element).hide();
                    this.hasToggledDisplay = true;
                }
                this.callback();
                if (this.autoRemove)
                    EZI.AniManager.removeAnimation(this.identifier);
                if (this.toggle) {
                    this.callOnAllProperties('switchValues');
                }

                this.reset();
                (!this.repeat) ? this.stop():null;
                (this.type == this.RETURN) ? this.setType(this.ONCE): null;


            }
        }

    },

    addAnimatedProperty: function (property) {

        this.properties[property.propertyName] = property;
        property.animationId = this.identifier;

    },
    callOnAllProperties: function (func) {

        for(var k in this.properties) {
            this.properties[k][func]();
        }

    },
    setIdentifier: function(identifier) {

        this.identifier = identifier;

        for(var k in this.properties) {

            this.properties[k].animationId = identifier;

        }

    },
    setToggleDisplay: function (b) {
        this.toggleDisplay = b;
    },
    setType: function(type) {

        this.type = type;

        (this.type != this.ONCE) ?
            this.autoRemove = false:
            this.autoRemove = true;
        (this.type != this.ONCE && this.type != this.LOOP) ?
            this.toggle = true:
            this.toggle = false;
        (this.type == this.LOOP || this.type == this.LOOPBACK || this.type == this.RETURN) ?
            this.repeat = true:
            this.repeat = false;


    },
    setToggle: function(bool) {

        this.toggle = bool;
        this.autoRemove = !bool;

    },
    start: function () {

        this.animate = true;

        if (!EZI.AniManager.animate) {
            EZI.AniManager.start();
        }

    },

    stop: function (skipToEnd) {

        skipToEnd = (typeof skipToEnd == 'undefined') ? false: skipToEnd;
        if (skipToEnd) {
            this.curTime = this.duration
            this.loop();
        }

        this.animate = false;
    },
    reset: function () {
        this.curTime = 0;
        this.hasToggledDisplay = false;
        for (var k in this.properties) {
            if (this.properties[k].mustUpdate) {
                this.properties[k].reset();
            }
        }
    },
    forward: function (ms) {
        this.curTime += ms;
        if (this.curTime > this.duration) this.curTime = this.duration;
        if (this.curTime < 0) this.curTime = 0;
    },
    rewind: function (ms) {
        this.curTime -= ms;
        if (this.curTime > this.duration) this.curTime = this.duration;
        if (this.curTime < 0) this.curTime = 0;
    }

});

module.exports = Animation;
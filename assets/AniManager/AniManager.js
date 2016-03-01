/**
 * Created by Stijn on 19/10/15.
 */



var AniManager = Object.create({

    animations: [],
    animate: false,

    prevFrame: null,
    curFrame: null,
    deltaTime: null,

    init: function () {
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        return this;
    },

    loop: function () {

        this.calcDelta();

        for(var k in this.animations) {

            this.animations[k].draw();

        }

        if (!this.isRunning()) this.stop();

        if (this.animate) window.requestAnimFrame(function () {EZI.AniManager.loop()});

    },

    calcDelta: function () {

        this.prevFrame = this.curFrame;
        this.curFrame = Date.now();
        this.deltaTime = this.curFrame - this.prevFrame;

    },

    stop: function () {

        this.animate = false;

    },
    start: function () {

        this.animate = true;
        this.curFrame = Date.now();
        this.loop();

    },

    startAll: function () {

        for (var k in this.animations) {

            this.animations[k].start();

        }

    },
    stopAll: function (skipToEnd) {

        skipToEnd = (typeof skipToEnd == 'undefined') ? false: skipToEnd;

        for (var k in this.animations) {

            this.animations[k].stop(skipToEnd);

        }

    },
    isRunning: function () {
        var b = false;
        for (var k in this.animations) {
            if (this.animations[k].animate) b = true;
        }
        return b;

    },
    addAnimation: function (animation, identifier) {

        this.animations[identifier] = animation;
        this.animations[identifier].setIdentifier(identifier);


    },
    removeAnimation: function (identifier) {

        this.animations[identifier].stop();
        delete this.animations[identifier];

    }


}).init();

module.exports = AniManager;
export default function (Class) {
    if (!window.requestAnimFrame) {
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }
    return Class.extend({
        /*
        {
            get: func,
            set: func,
            duration: number,
            initial: number,
            toValue: number,
            easing: easefunc,
            play: bool
        }
         */
        init (config) {
            this._configuration = EZI.maps._glimmerConfigMap(config);
            if (config.play)
                this.loop();
            return this;
        },
        do (config) {
            this._configuration = {
                ...this._configuration,
                ...config
            };
            if (config.play) {
                this.loop();
            }
        },
        loop () {
            this.calculate();
            this._configuration.set(this.value);
            if (this._p >= 1) {
                this.do({play: false});
            }
            if (this._configuration.play) {
                requestAnimFrame(this.loop.bind(this));
            }
        },
        calculate () {
            if (!this._previousTimestamp)
                this._previousTimestamp = this._currentTimestamp;
            this._p = this._p + (this._currentTimestamp - this._previousTimestamp) / this._configuration.duration;
            this._previousTimestamp = this._currentTimestamp;
        },
        _delta: {
            get () {
                return this._configuration.toValue - this._configuration.initial;
            },
            visible: false
        },
        _p: {
            value: 0,
            visible: false
        },
        _previousTimestamp: {
            value: null,
            visible: false
        },
        _currentTimestamp: {
            get () {
                return Date.now();
            },
            visible: false
        },
        value: {
            get () {
                return this._configuration.initial + this._delta * this._configuration.easing(this._p);
            }
        }
    });
}
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
        _configuration: {
            value: {},
            visible: false,
            editable: true
        },
        init (config) {
            this._shined = config.shined;
            this._configuration = Ore.maps._glimmerConfigMap(config);
            if (config.play)
                this.loop();
            return this;
        },
        do (config) {
            this._configuration = {
                ...this._configuration,
                ...config,
                callback: (config.callback)?config.callback.bind(this):null
            };
            if (config.play) {
                this.loop();
            }
        },
        extract (config) {
            let full = {...this._configuration, progress: this._p, delta: this._delta, value: this._value, shined: this._shined};
            if (config === '*')
                return full;
            else if (typeof config === 'object') {
                let resp = {};
                for (var k in config) {
                    if (full[k] !== undefined) {
                        resp[k] = full[k];
                    }
                }
                return resp;
            }
            else
                console.error('Can\'t interpret config. Please pass an object or \'*\'', config);
        },
        loop () {
            this.calculate();
            this._configuration.set(this.value);
            if (this._p >= 1) {
                this.do({play: false});
                this._callback(this._configuration);
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
        _callback: {
            value () {
                if (this._configuration.callback)
                    this._configuration.callback(this.extract('*'));
            },
            visible: false,
            editable: false
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
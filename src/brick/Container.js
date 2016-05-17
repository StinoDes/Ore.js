export default function (Class) {
    return Class.extend({
        init (config) {
            this._value = config.initial;
            this._type = config.type;
            this._get = config.get || this._get;
            this._set = config.set || this._set;
            this.name = config.name;
            return this;
        },
        value: {
            get () {
                return this._get();
            }
        },
        name: null,
        _value: {
            value: null,
            visible: false
        },
        _type: {
            value: null,
            visible: false
        },
        _get: {
            value () {
                return this._value;
            },
            visible: false
        },
        _set: {
            value (value) {
                return value;
            },
            visible: false
        },
        set (value) {
            let b = false;
            value = this._set(value);
            switch (this._type) {
                case 'Array':
                    if (value.constructor === Array)
                        b = true;
                    break;
                default:
                    if (typeof value === this._type)
                        b = true;
                    break
            }
            if (b)
                this._value = value;
            else
                console.error('The value you passed is not of the correct type.');
        }
    });
}
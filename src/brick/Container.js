export default function (Class) {
    return Class.extend({
        init (config) {
            this._value = config.initial;
            this._type = config.type;
            this._get = config.get || this._get;
            this._set = config.set || this._set;
            this.name = config.name;
            if (config.reactions)
                this.add(config.reactions);
            return this;
        },
        value: {
            get () {
                return this._get();
            },
            set (value) {
                this.set(value);
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
        _listeners: {
            value: [],
            visible: false,
            editable: true
        },
        _handlers: {
            value: [],
            visible: false,
            editable: true
        },
        _react: {
            value () {
                for (var k in this._listeners) {
                    this._listeners[k].do({render: ''});
                }
                for (var k in this._handlers) {
                    this._handlers[k](this.value);
                }
            },
            visible: false,
            editable: false
        },
        add (callbacks){
            if (!callbacks)
                return null;
            else if (typeof callbacks === 'function')
                this._handlers.push(callbacks);
            else if (callbacks._mined)
                this._listeners.push(callbacks);
            else if (callbacks.constructor === Array) {
                for (var k in callbacks) {
                    this.add(callbacks[k]);
                }
            }

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
            this._react();
        },
        do (config) {
            if (typeof config !== 'object')
                this.set(config);
            else {
                this.set(config.value);
                this.add(config.reactions);
            }
        }
    });
}
/**
 * Created by Stijn on 01/03/16.
 */

var DataStoreVariable = Object.create({

    init: function (name, value, type, listeners) {
        if (Array.isArray(listeners))
            listeners = listeners;
        else if (listeners === undefined || !listeners)
            listeners = [];
        else
            listeners = [listeners];
        this.setName(name);
        this.setType(type);
        this.setValue(value);
        //components
        this._subscribers = [];
        //functions
        this._handlers = [];
        for (var k in listeners) {
            if (typeof listeners === 'function')
                this._handlers.push(listeners[k]);
            else
                this._subscribers.push(listeners[k]);
        }
        this._triggersRerender = true;
        return this;
    },
    callToSubscribers: function () {
        for (var k in this._handlers) {
            this._handlers[k](this.getValue());
        }
        for (var k in this._subscribers) {
            this._subscribers[k]._dataVarChanged(this._triggersRerender);
        }
    },
    addSubscriber: function (listener) {
        if (typeof listener === 'function')
            this._handlers.push(listener);
        else
            this._subscribers.push(listener);
    },
    removeSubscriber: function (listener) {
        if (typeof listener === 'function') {
            var i = this._handlers.getIndexOf(listener);
            this._handlers.splice(i, 1);
        }
        else {
            var i = this._subscribers.getIndexOf(listener);
            this._subscribers.splice(i, 1);
        }
    },
    setName: function (name) {
        this._name = name;
    },
    getName: function () {
        return this._name;
    },
    setType: function (type) {
        this._type = type;
        this.callToSubscribers();
    },
    getType: function () {
        return this._type;
    },
    setValue: function (value) {
        if ((this.getType() && typeof value === this.getType()) || value == null) {
            this._value = value;
            this.callToSubscribers();
        }
        else
            console.error('Value is not of the type specified.');
    },
    getValue: function () {
        return this._value;
    },
    triggersRerender: function (bool) {
        this._triggersRerender = bool;
    },
});
module.exports = DataStoreVariable;

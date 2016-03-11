/**
 * Created by Stijn on 01/03/16.
 */

var DataBankVariable = Object.create({

    init: function (name, value, type, listeners) {
        listeners = (Array.isArray(listeners))?listeners:[listeners];
        this.setName(name);
        this.setType(type);
        this.setValue(value);
        this._listeners = (listeners == undefined)?[]:listeners;
        this._triggersRerender = true;
        return this;
    },
    callToListeners: function () {
        for (var k in this._listeners) {
            this._listeners[k]._dataVarChanged(this._triggersRerender);
        }
    },
    addListener: function (listener) {
        this._listeners.push(listener);
    },
    removeListener: function (listener) {
        var i = this._listeners.getIndexOf(listener);
        this._listeners.splice(i, 1);
    },
    setName: function (name) {
        this._name = name;
    },
    getName: function () {
        return this._name;
    },
    setType: function (type) {
        this._type = type;
        this.callToListeners();
    },
    getType: function () {
        return this._type;
    },
    setValue: function (value) {
        if ((this.getType() && typeof value === this.getType()) || value == null) {
            this._value = value;
            this.callToListeners();
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
module.exports = DataBankVariable;

/**
 * Created by Stijn on 01/03/16.
 */

//DATABANK OBJECT
//HOLDS VARIABLES, REFRESHES LISTENING COMPONENTS ON VAR UPDATe
var DataStore = Object.create({

    //Initial Data: Array of {name: value} objects
    init: function (initialData) {
        this._data = {};
        (typeof initialData == 'object')?this._dataFromObject(initialData):null;
        return this;
    },
    _dataFromObject: function (object) {
        var dataObject = {};
        for (var k in object) {
            dataObject[k] =  this.createDataVar(k, object[k], typeof object[k]);
        }
    },
    createDataVar: function (name, value, type, listeners) {
        this._data[name] = Object.create(require('./DataStoreVariable')).init(name, value, type, listeners);
        return this.getDataVar(name);
    },
    setDataVar: function (name, value) {
        this._data[name].setValue(value);
    },
    getDataVar: function (name, getWholeObject) {
        return (getWholeObject)?this._data[name]:this._data[name].getValue();
    },
    dataVarExists: function (name) {
        if (this.getDataVar(name, true))
            return true;
        return false;
    },
    addAsSubscriberTo: function (componentOrFunction, nameArray) {
        for (var k in nameArray) {
            this.getDataVar(nameArray[k], true).addSubscriber(componentOrFunction);
        }
    }

});

module.exports = DataStore;
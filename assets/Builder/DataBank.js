/**
 * Created by Stijn on 01/03/16.
 */

//DATABANK OBJECT
//HOLDS VARIABLES, REFRESHES LISTENING COMPONENTS ON VAR UPDATe
var DataBank = Object.create({

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
        this._data[name] = Object.create(require('./DataBankVariable')).init(name, value, type, listeners);
        return this.getDataVar(name);
    },
    setDataVar: function (name, value) {
        this._data[name].setValue(value);
    },
    getDataVar: function (name, getWholeObject) {
        return (getWholeObject)?this._data[name]:this._data[name].getValue();
    },
    addAsListenerTo: function (object, nameArray) {
        for (var k in nameArray) {
            this.getDataVar(nameArray[k], true).addListener(object);
        }
    }

});

module.exports = DataBank;
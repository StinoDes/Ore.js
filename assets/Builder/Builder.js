/**
 * Created by Stijn on 28/02/16.
 */

//BUILDER OBJECT
//APP'S BASE
var Builder = Object.create({

    _baseComponents: {},

    init: function (appName, initialData) {
        this.setAppName(appName);
        this._dataBank = Object.create(DataBank).init(initialData);
        this._registeredComponents = this._baseComponents;
        return this;
    },


    setAppName: function (appName) {
        this._appName = appName;
    },
    getAppName: function () {
        return this._appName;
    },

    getDataBank: function () {
        return this._dataBank;
    },

    _getRenderedApp: function () {
        return this._rootComponent.render();
    },
    _renderApp: function () {
        EZ('body').append(this._getRenderedApp());
    },

    setRootComponent: function (component) {
        this._rootComponent = this.getRegisteredComponent(component);
    },
    defineComponent: function (parentComponent, objToApply) {
        var newComponent = Object.create(this.getRegisteredComponent(parentComponent));
        for (var k in objToApply) {
            newComponent[k] = objToApply[k];
        }
        return newComponent;
    },
    registerComponent: function (componentName, component) {
        if (this._registeredComponents[componentName] === undefined)
            this._registeredComponents[componentName] = component;
        else
            console.error('Could not define component. "' + componentName + '" already exists.');
    },
    getRegisteredComponent: function (componentName) {
        return this._registeredComponents[componentName];
    },

    createComponent: function (componentName, properties) {
        return this.getRegisteredComponent(componentName).init(properties, this);
    }


});

//DATABANK OBJECT
//HOLDS VARIABLES, REFRESHES LISTENING COMPONENTS ON VAR UPDATe
var DataBank = Object.create({

    //Initial Data: Array of {name: value} objects
    init: function (initialData) {
        this._data = (typeof initialData == 'Object')?this._dataFromObject(initialData):{};
        return this;
    },
    _dataFromObject: function (object) {
        var dataObject = {};
        for (var k in object) {
            dataObject[k] =  this.createDataVar(k, object[k].value, typeof object[k].value);
        }
        return dataObject;
    },
    createDataVar: function (name, value, type, listeners) {
        this._data[name] = Object.create(DataBankVariable).init(name, value, type, listeners);
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
            nameArray[k].addListener(object);
        }
    }

});
var DataBankVariable = Object.create({

    init: function (name, value, type, listeners) {
        this.setName(name);
        this.setType(type);
        this.setValue(value);
        this._listeners = (listeners == undefined)?[]:listeners;
        return this;
    },
    callToListeners: function () {
        for (var k in this._listeners) {
            this._listeners[k]._dataVarChanged();
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
        if (typeof value === this.getType()) {
            this._value = value;
            this.callToListeners();
        }
        else
            console.error('Value is not of the type specified.');
    },
    getValue: function () {
        return this._value;
    }
});


//COMPONENT
//BASIC ELEMENT
EZI.Builder._baseComponents.Component = Object.create({

    init: function (properties, builder) {
        this.properties = properties;
        this._builder = builder;
        return this;
    },
    _dataVarChanged: function () {
        this.dataVarsHaveUpdated();
        this.willUpdate();
        this.render();
    }
});

module.exports = Builder;
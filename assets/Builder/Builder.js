/**
 * Created by Stijn on 28/02/16.
 */

//BUILDER OBJECT
//APP'S BASE
var Builder = Object.create({

    _baseComponents: {},

    init: function (appName, initialData) {
        this.setAppName(appName);
        this._router = Object.create(require('./utilities/Router.js')).init();
        this._dataBank = Object.create(require('./utilities/DataBank.js')).init(initialData);
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
    getRouter: function () {
        return this._router;
    },

    _getRenderedApp: function () {
        return this.createComponent(this._rootComponent)._startRender();
    },
    _renderApp: function () {
        EZ('body').append(this._getRenderedApp());
    },

    setRootComponent: function (component) {
        this._rootComponent = component;
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
    },
    _setRenderingComponent: function (component) {
        this._renderingComponent = component;
    },
    _getRenderingComponent: function () {
        return this._renderingComponent;
    },
    _clearRenderingComponent: function () {
        this._renderingComponent = undefined;
    }


});

Builder._baseComponents.Component = require('./components/Component');
Builder._baseComponents.Button = require('./components/Button');

module.exports = Builder;
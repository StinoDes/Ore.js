/**
 * Created by Stijn on 02/03/16.
 */
//COMPONENT
//BASIC ELEMENT
var Component = Object.create({

    init: function (properties, builder) {
        this.properties = properties;
        this._builder = builder;
        this._children = {};
        this._dataVarChangedHandlers = [];
        this.componentWillMount();
        return this;
    },
    _dataVarChanged: function (rerender) {
        this.dataVarsHaveUpdated();
        this.willUpdate();
        for (var k in this._dataVarChangedHandlers) {
            this._dataVarChangedHandlers[k]();
        }
        if (rerender)
            this._startRender();
    },
    addDataVarChangedHandler: function (handler) {
        this._dataVarChangedHandlers.push(handler);
    },
    componentWillMount: function () {

    },
    dataVarsHaveUpdated: function () {

    },
    willUpdate: function () {

    },
    //keyed array of {name: child, name: child}
    addMultipleChildComponents: function(keyedChildrenArray) {
        for (var k in keyedChildrenArray) {
            this.addChildComponent(keyedChildrenArray[k]);
        }
    },
    addChildComponent: function (name, component) {
        this._children[name] = component;
    },
    removeChildComponent: function (name) {
        this._children[name] = undefined;
    },

    //RENDERING
    _startRender: function () {
        console.log('rerendering');
        var returnvalue;
        this._builder._addRenderingComponent(this);
        returnvalue = this.render();
        this._builder._removeRenderingComponent();

        //REPLACING IN DOM TREE IF NEEDED
        var prevEl = EZI.Elemental.getElementByEziId(this._elementId);
        if (prevEl) {
            console.log('replacing element');
            returnvalue.replace(prevEl);
        }
        this._elementId = returnvalue._getEziId();
        return returnvalue;
    },
    render: function () {
        return EZI.make('div');
    },
    renderChildComponent: function (name) {
        return this._children[name]._startRender();
    },
});

module.exports = Component;

/**
 * Created by Stijn on 02/03/16.
 */
//COMPONENT
//BASIC ELEMENT
var Component = Object.create({

    init: function (properties, builder) {
        this.setProperties(properties);
        this._builder = builder;
        this._children = {};
        this._dataVarChangedHandlers = [];
        this.componentWillMount();
        return this;
    },
    setProperties: function (props) {
        if (this.properties === undefined)
            this.properties = {};
        for (var k in props) {
            this.properties[k] = props[k];
        }
    },
    _dataVarChanged: function (rerender) {
        this.dataVarsHaveUpdated();
        for (var k in this._dataVarChangedHandlers) {
            this._dataVarChangedHandlers[k]();
        }
        this.willUpdate();
        if (rerender)
            this._startRender();
    },
    addDataVarChangedHandler: function (handler) {
        this._dataVarChangedHandlers.push(handler);
    },

    //HOOKS
    componentWillMount: function () {

    },
    dataVarsHaveUpdated: function () {

    },
    willUpdate: function () {

    },

    getChildComponent: function (name) {
        return this._children[name];
    },
    //keyed array of {name: child, name: child}
    addMultipleChildComponents: function(keyedChildrenArray) {
        for (var k in keyedChildrenArray) {
            console.log(k);
            this.addChildComponent(k, keyedChildrenArray[k]);
        }
    },
    addChildComponent: function (name, component) {
        this._children[name] = component;
    },
    removeChildComponent: function (name) {
        delete this._children[name];
    },

    //RENDERING
    _startRender: function (properties) {
        this.setProperties(properties);
        var returnvalue;
        this._builder._addRenderingComponent(this);
        returnvalue = this.render();
        this._builder._removeRenderingComponent();
        //REPLACING IN DOM TREE IF NEEDED
        var prevEl = EZI.Elemental.getElementByEziId(this._elementId);
        if (prevEl) {
            console.log(returnvalue.element);
            console.log(prevEl.element);
            returnvalue.replace(prevEl);
        }
        this._elementId = returnvalue._getEziId();
        return returnvalue;
    },
    _startRenderCopy: function (properties) {
        this.setProperties(properties);
        var returnvalue;
        this._builder._addRenderingComponent(this);
        returnvalue = this.render();
        this._builder._removeRenderingComponent();

        //REPLACING IN DOM TREE IF NEEDED
        //var prevEl = EZI.Elemental.getElementByEziId(this._elementId);
        //if (prevEl) {
        //    console.log('replacing element');
        //    returnvalue.replace(prevEl);
        //}
        this._elementId = []
        this._elementId.push(returnvalue._getEziId());
        return returnvalue;
    },
    render: function () {
        return EZI.make('div');
    },
    renderChildComponent: function (name, properties, copy) {
        if (this._children[name] !== undefined && this._children[name]) {
            if (!copy)
                return this._children[name]._startRender(properties);
            else
                return this._children[name]._startRenderCopy(properties);
        }
        else {
            console.error('Error while rendering ' + name + ' as child. Are you sure you added it as a child-component?');
        }
    },
});

module.exports = Component;

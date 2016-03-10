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
        this.componentWillMount();
        return this;
    },
    _dataVarChanged: function () {
        this.dataVarsHaveUpdated();
        this.willUpdate();
        this._startRender();
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
        var returnvalue;
        this._builder._setRenderingComponent(this);
        returnvalue = this.render();
        this._builder._clearRenderingComponent();
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

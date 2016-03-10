/**
 * Created by Stijn on 03/03/16.
 */
var Page = Object.create(require('./Component'));

Page.init = function (title, properties, builder) {
    this.properties = properties;
    this._builder = builder;
    this._children = {};
    this.componentWillMount();
    this.setTitle(title);
    return this;
};
Page.setTitle = function (title) {
    this._title = title;
};
Page.getTitle = function () {
    return this._title;
};
Page.setRootComponent = function (component) {
    this.addChildComponent('ROOT', component);
};
Page.render = function () {
    EZ('head title').text(this.getTitle());
    return this.renderChildComponent('ROOT');
};

module.exports = Page;
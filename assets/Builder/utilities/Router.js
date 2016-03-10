/**
 * Created by Stijn on 03/03/16.
 */

var Router = Object.create({
    init: function () {
        this._appBaseUrl = this.getBaseUrl();
        this._isSinglePage = false;
        this._routes = {};
        this._splitChar = '#';
        return this;
    },

    getBaseUrl: function () {
        var url = window.location.href.split(this._splitChar)[0];
        return url;
    },
    getRouteString: function () {
        var url = window.location.href.split(this._splitChar)[1];
        return url;
    },
    setIsSinglePage: function (bool) {
        this._isSinglePage = bool;
    },
    getIsSinglePage: function () {
        return this._isSinglePage;
    },

    getCurrentRoute: function () {
        var routeString = this.getRouteString();
        if (routeString[0] === '/')
            routeString = routeString.substr(1, routeString.length-1);
        for (var k in this._routes) {
            if (this._routes[k].getRouteString() === routeString) {
                return this._routes[k];
            }
        }
        this.goToPage(this._rootRoute);
    },
    getCurrentPage: function () {
        return this.getCurrentRoute()._page;
    },
    getRoute: function (identifier) {
        return this._routes[identifier];
    },
    createRoute: function (identifier, urlString, page) {
        var route = Object.create(require('./Route')).init(identifier, urlString, page);
        return route;
    },
    addRoute: function (route) {
        if (this._routes[route.getIdentifier()] == undefined)
            this._routes[route.getIdentifier()] = route;
        else
            console.error('A route with this identifier already exists.');
    },
    setRootRoute: function (identifier) {
        this._rootRoute = identifier;
    },
    createAndAddRoute: function (identifier, urlString, page) {
        this.addRoute(this.createRoute(identifier, urlString, page));
    },
    getRouteWithData: function (routeIdentifier, dataObject) {
        return this.getRoute(routeIdentifier).getUrlWithPassedData(dataObject);
    },
    goToPage: function (routeIdentifier, dataObject) {
        console.log('going to' + routeIdentifier);
        if (this.getIsSinglePage()) {

        }
        else {
            var splitPart = '';
            if (this.getBaseUrl()[this.getBaseUrl().length-1] !== '/' )
                splitPart += '';
            splitPart += this._splitChar;
            if (this.getRouteWithData(routeIdentifier, dataObject)[0] !== '/')
                splitPart += '/';
            window.location.href = this.getBaseUrl() + splitPart + this.getRouteWithData(routeIdentifier, dataObject);
            EZI.getApp()._renderApp();
        }
    }
});

module.exports = Router;

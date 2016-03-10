/**
 * Created by Stijn on 03/03/16.
 */

var Router = Object.create({
    init: function () {
        this._appBaseUrl = this.getBaseUrl();
        this._isSinglePage = false;
        this._routes = {};
        return this;
    },

    getBaseUrl: function () {
        var url = window.location.href;
        url.split('#');
        return url[0];
    },

    setIsSinglePage: function (bool) {
        this._isSinglePage = bool;
    },
    getIsSinglePage: function () {
        return this._isSinglePage;
    },

    getRoute: function (identifier) {
        return this._routes[identifier];
    },
    createRoute: function (identifier, urlString, page) {
        var route = Object.create(require('./Route')).init(identifier, urlString, page);
    },
    addRoute: function (route) {
        if (this._routes[route.getIdentifier()] == undefined)
            this._routes[route.getIdentifier()] = route;
        else
            console.error('A route with this identifier already exists.');
    },
    createAndAddRoute: function (identifier, urlString, page) {
        this.addRoute(this.createRoute(identifier, urlString, page));
    },
    getRouteWithData: function (routeIdentifier, dataObject) {
        return this.getRoute(routeIdentifier).getUrlWithPassedData(dataObject);
    },
    goToPage: function (routeIdentifier, dataObject) {
        if (this.getIsSinglePage()) {

        }
        else {
            window.location.href = this.getBaseUrl() + this.getRouteWithData(routeIdentifier, dataObject);
        }
    }
});

module.exports = Router;

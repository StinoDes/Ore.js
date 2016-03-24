/**
 * Created by Stijn on 03/03/16.
 */
var Route = Object.create({

    //Need identifier, 'URL' and page-component to init route
    //identifier is used to find and use the correct route ('HomePage' for example)
    //routeString is the appendix of the url (if url is 'mysite.com/StinoDes/feed', routestring is ':user:/feed'
    init: function (identifier, routeString, page) {
        this._identifier = identifier;
        this._routeString = routeString;
        this._page = page;
        return this;
    },
    getIdentifier: function () {
        return this._identifier;
    },
    getRouteString: function () {
        return this._routeString;
    },
    getPage: function () {
        return this._page;
    },
    urlBelongsToRoute: function (url) {
        url = url.split('/');
        var thisurl = this.getRouteString().split('/');
        for (var k in url) {
            if (thisurl[k][0] === ':' && thisurl[k][thisurl[k].length-1] === ':')
                continue;
            else if (thisurl[k] !== url[k])
                return false;
        }
        return true;
    },
    //if url is like 'users/:user:/posts', dataobj will contain an identifying string for user
    //like {user: 'user1'}
    getUrlWithPassedData: function (dataObj) {
        var urlString = this.getRouteString();
        for(var k in dataObj) {
            urlString = urlString.replace(':'+k+':', dataObj[k]);
        }
        return urlString;
    }
});

module.exports = Route;
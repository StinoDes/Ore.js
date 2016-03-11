/**
 * Created by Stijn on 30/10/15.
 */

var Elemental = Object.create({

    loaded: false,

    elementCount: 0,

    cache: [],

    init: function () {

        var self = this;
        if (!this.loaded) {
            Object.defineProperty(window.Element.prototype, 'ezi', {
               get: function () {
                   //console.log(this);
                   return self.setupElement(this);
               }
            });
        }
        return this;


    },

    setupElement: function (el) {

        if (!this.cache[el._eziId]) {
            this.elementCount ++;
            el._eziId = this.elementCount;
            this.cache[el._eziId] = Object.create(EZI.EziElement).init(el);
        }
        return this.cache[el._eziId];

    },

    getElementByEziId: function (id) {
        return this.cache[id];
    }

});

module.exports = Elemental;
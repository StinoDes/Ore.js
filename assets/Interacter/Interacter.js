/**
 * Created by Stijn on 23/10/15.
 */

var Interacter = Object.create({

    interactions: [],

    init: function () {
        return this;
    },

    addInteraction: function (interaction, name) {

        this.interactions[name] = interaction;
        this.interactions[name].setId(name);

    }

}).init();

module.exports = Interacter;


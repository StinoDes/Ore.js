/**
 * Created by Stijn on 01/03/16.
 */
var CSSProps = Object.create({

    init: function () {
        var i = 0;
        for(var k in this.properties) {
            this.properties[k].id = i;
            i++;
        }

        return this;
    },

    getPropertyObject: function (name) {
        for (var k in this.properties) {
            if (this.properties[k].name == name) return this.properties[k];
        }
    },

    properties: {
        background: {
            defaultUnit: '',
            name: 'background'
        },
        backgroundColor: {
            defaultUnit: '',
            name: 'background-color'
        },
        backgroundImage: {
            defaultUnit: '',
            name: 'background-image'
        },
        backgroundSize: {
            defaultUnit: '',
            name: 'background-size'
        },
        borderwidth: {
            defaultUnit: 'px',
            name: 'border-width',
        },
        borderradius: {
            defaultUnit: 'px',
            name: 'border-radius'
        },
        bottom: {
            defaultUnit: 'px',
            name: 'bottom'
        },
        display: {
            defaultUnit: '',
            name: 'display'
        },
        fontsize: {
            defaultUnit: 'px',
            name: 'font-size'
        },
        fontweight: {
            defaultUnit: '',
            name: 'font-weight'
        },
        height: {
            defaultUnit: 'px',
            name: 'height'
        },
        left: {
            defaultUnit: 'px',
            name: 'left'
        },
        margintop: {
            defaultUnit: 'px',
            name: 'margin-top'
        },
        marginbottom: {
            defaultUnit: 'px',
            name: 'margin-bottom'
        },
        marginleft: {
            defaultUnit: 'px',
            name: 'margin-left'
        },
        marginright: {
            defaultUnit: 'px',
            name: 'margin-right'
        },
        paddingtop: {
            defaultUnit: 'px',
            name: 'padding-top'
        },
        paddingbottom: {
            defaultUnit: 'px',
            name: 'padding-bottom'
        },
        paddingleft: {
            defaultUnit: 'px',
            name: 'padding-left'
        },
        paddingright: {
            defaultUnit: 'px',
            name: 'padding-right'
        },
        position: {
            defaultUnit: '',
            name: 'position'
        },
        opacity: {
            defaultUnit: '',
            name: 'opacity'
        },
        right: {
            defaultUnit: 'px',
            name: 'right'
        },
        top: {
            defaultUnit: 'px',
            name: 'top'
        },
        width: {
            defaultUnit: 'px',
            name: 'width'
        },
    }

}).init();

module.exports = CSSProps;

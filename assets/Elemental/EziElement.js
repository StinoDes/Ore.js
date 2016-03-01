/**
 * Created by Stijn on 01/03/16.
 */


var EziElement = Object.create({

    element: null,

    init: function (el) {
        this.element = el;

        return this;
    },

    //HIDING ELEMENT
    isHidden: function () {

        return getComputedStyle(this.element, null).getPropertyValue('display') == 'none';

    },
    toggle: function () {
        if (this.isHidden()) {
            this.hide();
        }
        else {
            this.show();
        }
    },

    hide: function () {
        this.element.style.display = 'none';
    },
    show: function () {
        this.element.style.display = 'block';
    },

    //QUICKCSS
    getHeight: function (includeMargin) {
        var value = this.height();
        value += this.property('padding-top');
        value += this.property('padding-bottom');
        value += this.property('border-width') * 2;
        if (includeMargin) {
            value += this.property('margin-top');
            value += this.property('margin-bottom');
        }
        return value;
    },
    getWidth: function (includeMargin) {
        var value = this.width();
        value += this.property('padding-left');
        value += this.property('padding-right');
        value += this.property('border-width') * 2;
        if (includeMargin) {
            value += this.property('margin-left');
            value += this.property('margin-right');
        }
        return value;
    },
    height: function (value, duration, easing, autoStart) {
        return this.property('height', value, duration, easing, autoStart);
    },
    width: function (value, duration, easing, autoStart) {
        return this.property('width', value, duration, easing, autoStart);
    },
    property: function (name, value, duration, easing, autoStart) {

        autoStart = (typeof autoStart == 'undefined') ? true: autoStart;
        var prop = EZI.CSSProps.getPropertyObject(name);

        if (!value && value != 0) {

            var value = 0;
            value += getComputedStyle(this.element, null).getPropertyValue(prop.name);
            if (value.match(/\d+/g) != null) value = parseFloat(value);
            return value;

        }
        else {

            if (!duration) {
                this.element.style[prop.name] = value + prop.defaultUnit;
            }
            else {
                var anim = EZI.createAnimation(this.element._eziId + prop.id, this.element, duration);
                EZI.createAnimProperty(this.element._eziId + prop.id, prop.name, this.property(prop.name), value, (!easing)?EZI.Easing.DEFAULT: easing);
                if (autoStart) anim.start();
                return anim;
            }

        }
    },

    //EDITING NODES
    text: function (text, andChilds) {
        if (typeof text == 'undefined') {
            var text;
            for (var i = 0; i < this.element.childNodes.length; i++) {
                if (this.element.childNodes[i].nodeName == '#text') {
                    if (andChilds) text = this.element.textContent;
                    else text = this.element.childNodes[i].nodeValue;
                    break;
                }
            }
            return text;
        }
        else {
            if (andChilds) {
                this.element.textContent = text;
            }
            else {
                var childTextNode;
                for (var i = 0; i < this.element.childNodes.length; i++) {
                    if (this.element.childNodes[i].nodeName == '#text') {
                        childTextNode = this.element.childNodes[i];
                    }
                }
                if (!childTextNode) {
                    childTextNode = document.createTextNode(text);
                    this.element.appendChild(childTextNode);
                }
                else {
                    childTextNode.nodeValue = text;
                }
            }
        }
    },
    value: function (value) {
        return this.attr('value', value);
    },
    placeholder: function (value) {
        return this.attr('value', value);
    },
    name: function (value) {
        return this.attr('name', value);
    },
    href: function (value) {
        return this.attr('href', value);
    },
    id: function (value) {
        return this.attr('id', value);
    },
    class: function (value) {
        return this.attr('class', value);
    },
    addClass: function (className) {
        this.class(this.class() + ' ' + className);
    },
    removeClass: function (className) {
        this.class(this.class().replace(className, ''));
    },
    attr: function (name, value) {

        if (!value && value != 0) {
            return this.element.getAttribute(name);
        }
        else {
            this.element.setAttribute(name, value);
        }

    },

    //EVENTS
    on: function (event) {
        var interaction = EZI.createInteraction(event + this.element._eziId, this.element, event);
        var loopEnd = (typeof arguments[arguments.length - 1] == 'boolean') ? arguments.length - 1: arguments.length;
        for (var i = 1; i < loopEnd; i++) {
            if (arguments[i].identifier) {
                interaction.addAnimation(arguments[i]);
            }
            else {

                interaction.addFunction(arguments[i]);
            }
        }
        if (loopEnd != arguments.length) interaction.preventDefault = arguments[arguments.length - 1];
        return interaction;
    },
    hasFocus: function () {
        return this.element == document.activeElement
    },
    caretPos: function () {
        var pos = 0;
        if (document.selection) {
            this.element.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', -this.element.value.length);
            pos = selection.text.length;
        }
        else if (this.element.selectionStart || this.element.selectionStart == '0') {
            pos = this.element.selectionStart;
        }
        return pos;
    },


    append: function (obj) {

        if (typeof obj == 'string') {
            this.element.appendChild(EZI.make(obj).element);
        }
        else if (typeof obj.element == 'undefined') {
            this.element.appendChild(obj);
        }
        else {
            this.element.appendChild(obj.element);
        }

    },
    clear: function () {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    },
    parent: function () {
        return EZ(this.element.parentNode);
    },
    clone: function (children) {
        return (typeof children =='undefined') ? EZ(this.element.cloneNode(true)) : EZ(this.element.cloneNode(children));
    }

});

module.exports = EziElement;
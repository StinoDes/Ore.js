/**
 * Created by Stijn on 01/03/16.
 */


var EziElement = Object.create({

    element: null,

    init: function (el) {
        this.element = el;
        this.transformer = Object.create(require('./Transformer')).init();
        return this;
    },
    _getEziId: function () {
        return this.element._eziId;
    },

    parent: function () {
        return EZ(this.element.parentElement);
    },
    index: function () {
        var index = 0,
            node = this.element;
        while ((node = node.previousElementSibling )) {
            index++;
        }
        return index;

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
    //Params: name, x, y, z || name, valueArr, duration, easing
    transform: function (transformName, par1, par2, par3) {
        if (typeof par1 === 'number') {
            this.transformer.setTransform(transformName, par1, par2, par3);
            this.transformer.transformElement(this);
        }
        else if (par1.length !== undefined) {
            if (par2 === undefined) {
                this.transformer.setTransform.apply(this.transformer, [transformName].concat(par1));
                this.transformer.transformElement(this);
            }
            else {
                var autostart = (arguments[4]!== undefined)?arguments[4]:true;
                if (EZI.AniManager.animations[this.element._eziId + 'transform'] === undefined) {
                    anim = EZI.createAnimation(this.element._eziId + 'transform', this.element, par2);
                    anim.addAnimatedProperty(this.transformer.createTransformAnimation(transformName, par1, (!par3) ? EZI.Easings.DEFAULT : par3));
                    if (autostart) anim.start();
                }
                else {
                    anim = EZI.AniManager.animations[this.element._eziId + 'transform'];
                    anim[this.element._eziId + 'transform'].addTransform(transformName, par1);
                    if (autostart) anim.start();
                }
                return anim;
            }
        }
    },
    translate: function (x, y, z) {
        this.transform('translate', x, y, z);
    },
    rotate: function (a, b, c) {
        this.transform('rotate', a, b, c);
    },
    scale: function (x, y, z) {
        this.transform('scale', x, y, z);
    },
    property: function (name, value, duration, easing, autoStart) {

        autoStart = (typeof autoStart == 'undefined') ? true: autoStart;
        var prop = EZI.CSSProps.getPropertyObject(name);

        if (!value && value !== 0) {

            //var value = 0;
            console.log(name);
            var value = getComputedStyle(this.element, null).getPropertyValue(prop.name);
            if (value.match(/\d+/g) != null) value = parseFloat(value);
            return value;

        }
        else {

            if (!duration) {
                this.element.style[prop.name] = value + prop.defaultUnit;
            }
            else {
                var anim = EZI.createAnimation(this.element._eziId + prop.id, this.element, duration);
                EZI.createAnimProperty(this.element._eziId + prop.id, prop.name, this.property(prop.name), value, (!easing)?EZI.Easings.DEFAULT: easing);
                if (autoStart) anim.start();
                return anim;
            }

        }
    },

    //EDITING NODES
    text: function (string, andChilds) {
        if (typeof string == 'undefined') {
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
                this.element.textContent = string;
            }
            else {
                var childTextNode;
                for (var i = 0; i < this.element.childNodes.length; i++) {
                    if (this.element.childNodes[i].nodeName == '#text') {
                        childTextNode = this.element.childNodes[i];
                    }
                }
                if (!childTextNode) {
                    childTextNode = document.createTextNode(string);
                    this.element.appendChild(childTextNode);
                }
                else {
                    childTextNode.nodeValue = string;
                }
            }
        }
    },
    value: function (value) {
        if (value === undefined)
            return this.element.value;
        else
            this.element.value = value;
    },
    placeholder: function (value) {
        return this.attr('placeholder', value);
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
    hasClass: function (className) {
        var classes = this.class().split(' ');
        if (classes === undefined || classes === null)
            return false;
        return classes.indexOf(className) > -1;
    },
    toggleClass: function (className) {
        if (this.hasClass(className)) {
            this.removeClass(className);
        }
        else {
            this.addClass(className);
        }
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

        if (obj === undefined) {
            console.error('The object you\'re trying to append is undefined. Please pass a tag-string, EZI-element or DOM-element.');
        }
        else if (typeof obj == 'string') {
            this.element.appendChild(EZI.make(obj, arguments[1]).element);
        }
        else {
            this.element.appendChild(obj.element || obj);
        }
    },
    appendAtIndex: function (obj, index) {
        var insertBefore = this.element.children[index];
        if (!insertBefore) {
            var insertAfter = this.element.children[this.element.children.length-1];
            insertAfter.insertAdjecentElement('afterEnd', obj.element);
        }
        else
            this.element.insertBefore(obj.element, insertBefore);
    },
    remove: function () {
        this.element.parentNode.removeChild(this.element);
        EZI.Elemental._deleteFromCache(this._getEziId());
    },
    replace: function (elToReplace) {
        var index = elToReplace.index();
        elToReplace.parent().appendAtIndex(this, index);
        elToReplace.remove();

    },
    clear: function () {
        var children = this.children();
        for (var k in children) {
            children[k].remove();
        }
    },
    parent: function () {
        return EZ(this.element.parentNode);
    },
    children: function () {
        var childrenArr = [],
            childNodes = this.element.childNodes;
        for (var k in childNodes) {
            if (EZ(childNodes[k]))
                childrenArr.push(EZ(childNodes[k]))
        }
        return childrenArr;
    },
    clone: function (children) {
        return (typeof children =='undefined') ? EZ(this.element.cloneNode(true)) : EZ(this.element.cloneNode(children));
    }

});

module.exports = EziElement;
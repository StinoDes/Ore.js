var EZI =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Stijn on 01/03/16.
	 */
	module.exports = __webpack_require__(1).init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Stijn on 22/10/15.
	 */

	var EZI = Object.create({

	    loadFilesOnInit: false,
	    autoInit: false,
	    filesLoaded: 0,

	    init: function () {
	        EZI.Elemental = EZI.Elemental.init();
	        EZI.AniManager = EZI.AniManager.init();
	        EZI.Interacter = EZI.Interacter.init();

	        document.onkeyup = document.onkeydown = function (e) {
	            e = e || event;
	            EZI.keymap[e.keyCode] = e.type == 'keydown';
	        };
	        window.EZ = function EZ (el) {
	                if (typeof el == 'string') {
	                    el = document.querySelector(el);
	                }
	                if (el == null) {
	                    return null;
	                }
	                else {
	                    return el.ezi;
	                }
	            }
	        return this;

	    },

	    files: ['AniManager', 'Elemental', 'Interacter', 'Builder'],
	    import: function (name, callback, async) {

	        var r = false;
	        var script = document.createElement('script');
	        script.src = name;
	        script.type = 'text/javascript';

	        script.onload = script.onreadystatechange = function () {

	            if (!r && (!this.readyState || this.readyState == 'complete')) {

	                r = true;
	                callback();

	            }

	        };

	        document.head.appendChild(script);

	    },
	    _thingsToDoWhenReady: [],
	    doWhenReady: function (func) {
	        this._thingsToDoWhenReady.push(func);
	    },
	    //ANIMANAGER
	    createAnimation: function (name, element, duration) {
	        var anim = Object.create(EZI.Animation).init(element, duration);
	        EZI.AniManager.addAnimation(anim, name);
	        return anim;
	    },
	    createAnimProperty: function (animName, propertyName) {
	        var animProperty = null;
	        if (arguments.length == 3) {
	            animProperty = Object.create(EZI.AnimatedProperty).init(propertyName, arguments[2]);
	        }
	        else if(arguments.length == 4) {
	            animProperty = Object.create(EZI.AnimatedProperty).init(propertyName, arguments[2], arguments[3]);
	        }
	        else if(arguments.length == 5) {
	            animProperty = Object.create(EZI.AnimatedProperty).init(propertyName, arguments[2], arguments[3], arguments[4]);
	        }
	        if (animName) EZI.AniManager.animations[animName].addAnimatedProperty(animProperty, propertyName);
	        return animProperty;
	    },
	    createStepProperty: function (animName, propertyName) {
	        var args = Array.prototype.slice.call(arguments);
	        args.splice(0, 1);
	        var stepProperty = Object.create(EZI.StepProperty)
	        stepProperty = stepProperty.init.apply(EZI.StepProperty, args);
	        if (animName != null)
	            EZI.AniManager.animations[animName].addAnimatedProperty(stepProperty, propertyName);
	        return stepProperty;
	    },
	    createAnimationStep: function (animName, stepPropertyName, propertyName) {
	        var animationStep = null;
	        if (arguments.length == 4) {
	            animationStep = Object.create(EZI.AnimationStep).init(propertyName, arguments[3]);
	        }
	        else if(arguments.length == 5) {
	            animationStep = Object.create(EZI.AnimationStep).init(propertyName, arguments[3], arguments[4]);
	        }
	        else if(arguments.length == 6) {
	            animationStep = Object.create(EZI.AnimationStep).init(propertyName, arguments[3], arguments[4], arguments[5]);
	        }
	        else if(arguments.length == 8) {
	            animationStep = Object.create(EZI.AnimationStep).init(propertyName, arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
	        }

	        if (animName != null && stepPropertyName != null)
	            EZI.AniManager.animations[animName].properties[stepPropertyName].addAnimationStep(animationStep);
	        return animationStep;
	    },

	    //INTERACTER
	    createInteraction: function (name, btn, event) {
	        var args = Array.prototype.slice.call(arguments);
	        args.splice(0, 1);
	        var interaction = Object.create(EZI.Interaction);
	        interaction = interaction.init.apply(interaction, args);
	        EZI.Interacter.addInteraction(interaction, name);
	        return interaction;
	    },

	    //ELEMENTAL
	    make: function (elstring, obj) {
	        if (/[A-Z][a-z]{0,}/.test(elstring)) {
	            //INIT COMPONENT IF ELSTRING STARTS WITH CAPITAL LETTER

	            //CHILD FROM RENDERING COMPONENT IN APP IF APP IS DEFINED
	            if (this.getApp()) {
	                return this.getApp()._getRenderingComponent().renderChildComponent(elstring);
	            }
	        }
	        var element = document.createElement(elstring);
	        (typeof obj != 'undefined') ? EZI.addAttrFromObj(EZ(element), obj) : null;
	        return EZ(element);
	    },
	    //EXAMPLE:
	    // 'div': { text: 'textNode\'s text', on: {click: onClickHandler}, children: [ {'div': { #ANOTHER OBJECT }} ] }
	    addAttrFromObj: function (element, obj) {
	        if (!obj)
	            obj = {};
	        if (obj.text) {
	            element.text(obj.text);
	            obj.text = undefined;
	        }
	        if (obj.on) {
	            for (var k in obj.on) {
	                element.on(k, obj.on[k]);
	            }
	            element.on = undefined;
	        }
	        if (obj.children) {
	            for (var k in obj.children) {
	                var tag = Object.keys(obj.children[k])[0];
	                element.append(EZI.make(tag, obj.children[k][tag]));
	            }
	            obj.children = undefined;
	        }
	        for (var k in obj) {
	            if (obj[k] !== undefined)
	                element.attr(k, obj[k]);
	        }
	    },

	    //VALUEMAP
	    createRange: function (min, max) {
	        if (typeof max == 'undefined')
	            return Object.create(EZI.Range).init(0, min);
	        else
	            return Object.create(EZI.Range).init(min, max);

	    },
	    createMap: function (domain, range) {
	        return Object.create(EZI.Map).init(domain, range);
	    },

	    //KEYSMAP
	    keymap: [],
	    keyIsDown: function (keycode) {
	        var b = this.keymap[keycode];
	        if (typeof b == 'undefined')
	            b = false;
	        return b;
	    },


	    //BUILDER
	    bootApp: function (app) {
	        if (typeof app == 'function') {
	            app = app();
	        }
	        this._app = app;
	        app.fireApp();
	        //app._renderApp();
	    },
	    getApp: function () {
	        return this._app;
	    }

	});

	EZI.Elemental = __webpack_require__(2);
	EZI.EziElement = __webpack_require__(3);
	EZI.CSSProps = __webpack_require__(4);

	EZI.AniManager = __webpack_require__(5);
	EZI.Animation = __webpack_require__(6);
	EZI.AnimatedProperty = __webpack_require__(7);
	EZI.AnimationStep = __webpack_require__(8);
	EZI.StepProperty = __webpack_require__(9);
	EZI.Easings = __webpack_require__(10);

	EZI.Interacter = __webpack_require__(11);
	EZI.Interaction = __webpack_require__(12);

	EZI.Map = __webpack_require__(13);
	EZI.Range = __webpack_require__(14);

	EZI.Builder = __webpack_require__(15);

	module.exports = EZI;

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */


	var EziElement = Object.create({

	    element: null,

	    init: function (el) {
	        this.element = el;

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
	    property: function (name, value, duration, easing, autoStart) {

	        autoStart = (typeof autoStart == 'undefined') ? true: autoStart;
	        var prop = EZI.CSSProps.getPropertyObject(name);

	        if (!value && value !== 0) {

	            //var value = 0;
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
	    },
	    replace: function (elToReplace) {
	        var index = elToReplace.index();
	        elToReplace.parent().appendAtIndex(this, index);
	        elToReplace.remove();

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */
	CSSProps = Object.create({

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 19/10/15.
	 */



	var AniManager = Object.create({

	    animations: [],
	    animate: false,

	    prevFrame: null,
	    curFrame: null,
	    deltaTime: null,

	    init: function () {
	        window.requestAnimFrame = (function(){
	            return  window.requestAnimationFrame       ||
	                window.webkitRequestAnimationFrame ||
	                window.mozRequestAnimationFrame    ||
	                function( callback ){
	                    window.setTimeout(callback, 1000 / 60);
	                };
	        })();
	        return this;
	    },

	    loop: function () {

	        this.calcDelta();

	        for(var k in this.animations) {

	            this.animations[k].draw();

	        }

	        if (!this.isRunning()) this.stop();

	        if (this.animate) window.requestAnimFrame(function () {EZI.AniManager.loop()});

	    },

	    calcDelta: function () {

	        this.prevFrame = this.curFrame;
	        this.curFrame = Date.now();
	        this.deltaTime = this.curFrame - this.prevFrame;

	    },

	    stop: function () {

	        this.animate = false;

	    },
	    start: function () {

	        this.animate = true;
	        this.curFrame = Date.now();
	        this.loop();

	    },

	    startAll: function () {

	        for (var k in this.animations) {

	            this.animations[k].start();

	        }

	    },
	    stopAll: function (skipToEnd) {

	        skipToEnd = (typeof skipToEnd == 'undefined') ? false: skipToEnd;

	        for (var k in this.animations) {

	            this.animations[k].stop(skipToEnd);

	        }

	    },
	    isRunning: function () {
	        var b = false;
	        for (var k in this.animations) {
	            if (this.animations[k].animate) b = true;
	        }
	        return b;

	    },
	    addAnimation: function (animation, identifier) {

	        this.animations[identifier] = animation;
	        this.animations[identifier].setIdentifier(identifier);


	    },
	    removeAnimation: function (identifier) {

	        this.animations[identifier].stop();
	        delete this.animations[identifier];

	    }


	});

	module.exports = AniManager;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */
	var Animation = Object.create({

	    //TYPE CONSTANTS
	    ONCE: 'once',
	    TOGGLE: 'toggle',
	    RETURN: 'return',
	    LOOP: 'loop',
	    LOOPBACK: 'loopback',

	    identifier: null,
	    properties: [],
	    element: null,
	    duration: null,
	    curTime: 0,
	    autoRemove: true,
	    toggle: false,
	    repeat: false,
	    type: this.ONCE,
	    callback: function () {},

	    animate: false,

	    toggleDisplay: false,
	    hasToggledDisplay: false,

	    id: 0,

	    init: function (element, duration, callback) {

	        this.identifier = null;
	        this.element = element;
	        this.duration = duration;
	        this.id = Math.random();
	        this.callback = (typeof callback != "undefined") ? callback: this.callback;
	        this.properties = [];

	        return this;

	    },

	    draw: function () {

	        if (this.animate) {

	            if (this.curTime == 0 && this.toggleDisplay && EZ(this.element).isHidden() && !this.hasToggledDisplay) {
	                EZ(this.element).show();
	                this.hasToggledDisplay = true;
	            }

	            this.curTime += EZI.AniManager.deltaTime;

	            if (this.curTime > this.duration) this.curTime = this.duration;

	            var progress = this.curTime / this.duration;

	            for (var k in this.properties) {

	                var property = this.properties[k];

	                if (property.isTransform()) {
	                    this.element.style.transform =
	                        property.getStyleString(progress);
	                    this.element.style.webkitTransform =
	                        property.getStyleString(progress);
	                    this.element.style.mozTransform =
	                        property.getStyleString(progress);
	                    this.element.style.msTransform =
	                        property.getStyleString(progress);
	                    this.element.style.oTransform =
	                        property.getStyleString(progress);
	                }
	                else {
	                    if (property.mustUpdate) {
	                        property.update(progress);
	                    }
	                    this.element.style[property.propertyName] =
	                        property.getStyleString(progress);
	                }

	            }

	            if (this.curTime >= this.duration) {
	                if (this.toggleDisplay && !EZ(this.element).isHidden() && !this.hasToggledDisplay) {
	                    !EZ(this.element).hide();
	                    this.hasToggledDisplay = true;
	                }
	                this.callback();
	                if (this.autoRemove)
	                    EZI.AniManager.removeAnimation(this.identifier);
	                if (this.toggle) {
	                    this.callOnAllProperties('switchValues');
	                }

	                this.reset();
	                (!this.repeat) ? this.stop():null;
	                (this.type == this.RETURN) ? this.setType(this.ONCE): null;


	            }
	        }

	    },

	    addAnimatedProperty: function (property) {

	        this.properties[property.propertyName] = property;
	        property.animationId = this.identifier;

	    },
	    callOnAllProperties: function (func) {

	        for(var k in this.properties) {
	            this.properties[k][func]();
	        }

	    },
	    setIdentifier: function(identifier) {

	        this.identifier = identifier;

	        for(var k in this.properties) {

	            this.properties[k].animationId = identifier;

	        }

	    },
	    setToggleDisplay: function (b) {
	        this.toggleDisplay = b;
	    },
	    setType: function(type) {

	        this.type = type;

	        (this.type != this.ONCE) ?
	            this.autoRemove = false:
	            this.autoRemove = true;
	        (this.type != this.ONCE && this.type != this.LOOP) ?
	            this.toggle = true:
	            this.toggle = false;
	        (this.type == this.LOOP || this.type == this.LOOPBACK || this.type == this.RETURN) ?
	            this.repeat = true:
	            this.repeat = false;


	    },
	    setToggle: function(bool) {

	        this.toggle = bool;
	        this.autoRemove = !bool;

	    },
	    start: function () {

	        this.animate = true;

	        if (!EZI.AniManager.animate) {
	            EZI.AniManager.start();
	        }

	    },

	    stop: function (skipToEnd) {

	        skipToEnd = (typeof skipToEnd == 'undefined') ? false: skipToEnd;
	        if (skipToEnd) {
	            this.curTime = this.duration
	            this.loop();
	        }

	        this.animate = false;
	    },
	    reset: function () {
	        this.curTime = 0;
	        this.hasToggledDisplay = false;
	        for (var k in this.properties) {
	            if (this.properties[k].mustUpdate) {
	                this.properties[k].reset();
	            }
	        }
	    },
	    forward: function (ms) {
	        this.curTime += ms;
	        if (this.curTime > this.duration) this.curTime = this.duration;
	        if (this.curTime < 0) this.curTime = 0;
	    },
	    rewind: function (ms) {
	        this.curTime -= ms;
	        if (this.curTime > this.duration) this.curTime = this.duration;
	        if (this.curTime < 0) this.curTime = 0;
	    }

	});

	module.exports = Animation;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */

	var AnimatedProperty = Object.create({

	    //constant
	    TRANSFORMS: ['scale', 'horizontal-translate', 'vertical-translate', 'rotate'],
	    mustUpdate: false,
	    animationId: null,
	    propertyName: null,
	    startValue: null,
	    endValue: null,
	    deltaValue: function () {return this.endValue - this.startValue;},
	    easing: null,
	    unit: 'px',

	    id: 0,

	    init: function (propertyName) {

	        if (arguments.length == 2) {

	            this.endValue = arguments[1];
	            this.easing = 'DEFAULT';
	            this.startValue = null; //TODO

	        }
	        else if (arguments.length == 3) {

	            this.endValue = arguments[1];
	            this.easing = arguments[2];
	            this.startValue = null; //TODO

	        }
	        else if (arguments.length == 4) {

	            this.startValue = arguments[1];
	            this.endValue = arguments[2];
	            this.easing = arguments[3];

	        }

	        this.propertyName = propertyName;
	        this.id = Math.random();
	        this.unit = EZI.CSSProps.getPropertyObject(this.propertyName).defaultUnit;

	        return this;

	    },
	    getStyleString: function (t) {

	        if (this.isTransform()) {

	            if (this.propertyName != this.TRANSFORMS[1] && this.propertyName != this.TRANSFORMS[2]) {
	                return this.propertyName+"("+ (this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+")";
	            }
	            else if (this.propertyName == this.TRANSFORMS[1]) {
	                return "translate("+(this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+",0)";
	            }
	            else if (this.propertyName == this.TRANSFORMS[2]) {
	                return "translate(0,"+(this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+")";
	            }

	        }
	        else {
	            return this.startValue + this.deltaValue() * EZI.Easings[this.easing](t) + this.unit;

	        }

	    },
	    isTransform: function () {
	        return this.TRANSFORMS.indexOf(this.propertyName) > -1;
	    },
	    switchValues: function () {
	        var end = this.startValue;
	        var st = this.endValue;
	        this.endValue = end;
	        this.startValue = st;
	    }

	});

	module.exports = AnimatedProperty;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Stijn on 01/03/16.
	 */
	var AnimationStep = Object.create(__webpack_require__(7), {

	    startTime: {
	        writable: true,
	        readable: true,
	        value: null
	    },
	    endTime: {
	        writable: true,
	        readable: true,
	        value: null
	    }

	});

	AnimationStep.init = function (propertyName) {

	    if (arguments.length == 2) {

	        this.endValue = arguments[1];
	        this.easing = 'DEFAULT';
	        this.startValue = null; //TODO
	        this.startTime = null;
	        this.endTime = null;

	    }
	    else if (arguments.length == 3) {

	        this.endValue = arguments[1];
	        this.easing = arguments[2];
	        this.startValue = null; //TODO
	        this.startTime = null;
	        this.endTime = null;

	    }
	    else if (arguments.length == 4) {

	        this.startValue = arguments[1];
	        this.endValue = arguments[2];
	        this.easing = arguments[3];
	        this.startTime = null;
	        this.endTime = null;

	    }
	    else if (arguments.length == 6) {

	        this.startValue = arguments[1];
	        this.endValue = arguments[2];
	        this.easing = arguments[5];
	        this.startTime = arguments[3];
	        this.endTime = arguments[4];

	    }

	    this.propertyName = propertyName;
	    this.id = Math.random();

	    return this;

	};

	AnimationStep.getStyleString = function (t) {

	    t = this.remapProgress(t);

	    if (this.isTransform()) {

	        if (this.propertyName != this.TRANSFORMS[1] && this.propertyName != this.TRANSFORMS[2]) {
	            return this.propertyName+"("+ (this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+")";
	        }
	        else if (this.propertyName == this.TRANSFORMS[1]) {
	            return "translate("+(this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+",0)";
	        }
	        else if (this.propertyName == this.TRANSFORMS[2]) {
	            return "translate(0,"+(this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit+")";
	        }

	    }
	    else {
	        return (this.startValue + this.deltaValue() * EZI.Easings[this.easing](t)) + this.unit;

	    }
	};
	AnimationStep.remapProgress = function (t) {

	    t -= this.startTime;
	    deltaT = this.endTime - this.startTime;
	    t *= (1 / deltaT);
	    if (t > 1) t = this.endTime;
	    return t;

	};
	AnimationStep.switchValues = function () {
	    var end = this.startValue;
	    var st = this.endValue;
	    this.endValue = end;
	    this.startValue = st;

	    var deltaT = this.endTime - this.startTime;
	    var startTime = 1 - this.endTime;
	    var endTime = startTime + deltaT;

	    this.startTime = startTime;
	    this.endTime = endTime;
	}


	module.exports = AnimationStep;

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */

	var StepProperty = Object.create({

	    //constant
	    TRANSFORMS: ['scale', 'horizontal-translate', 'vertical-translate', 'rotate'],
	    mustUpdate: true,

	    propertyName: '',
	    steps: [],
	    curStep: 0,

	    id: '',

	    init: function (name) {

	        this.propertyName = name;

	        for (var i = 1; i < arguments.length; i++) {
	            this.steps.push(arguments[i]);
	            if (i == 1) {
	                this.propertyName = this.steps[i-1].propertyName;
	            }
	        }

	        return this;

	    },
	    update: function (t) {
	        if (t >= this.curProperty().endTime) {

	            this.curStep++;
	            if (this.curStep >= this.steps.length) {
	                this.propertyName == '';
	            }
	            else {
	                this.propertyName = this.curProperty().propertyName;
	            }

	        }
	    },
	    reset: function () {
	        this.curStep = 0;
	        this.propertyName = this.curProperty().propertyName;
	    },
	    isTransform: function () {
	        return this.curProperty().isTransform();
	    },
	    addAnimationStep: function (step) {
	        this.steps.push(step);
	        if (this.steps.length == 1) {
	            this.propertyName = this.steps[0].propertyName;
	        }

	    },
	    curProperty: function () {
	        return this.steps[this.curStep];
	    },

	    getStyleString: function (t) {
	        if (typeof this.curProperty() != 'undefined')
	            return this.curProperty().getStyleString(t);
	    },
	    switchValues: function (t) {

	        var ar = this.steps;

	        for (var i = 0; i < ar.length; i++) {
	            this.steps[i] = ar[ar.length - 1 - i];
	            this.steps[i].switchValues();
	        }

	    }


	});

	module.exports = StepProperty;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */
	var Easings = Object.create({

	    LINEAR: 'linear',
	    EASEINQUAD: 'easeinquad',
	    EASEOUTQUAD: 'easeoutquad',
	    EASEINOUTQUAD: 'easeinoutquad',
	    EASEINCUBIC: 'easeincubic',
	    EASEOUTCUBIC: 'easeoutcubic',
	    EASEINOUTCUBIC: 'easeinoutcubic',
	    EASEINQUART: 'easeinquart',
	    EASEOUTQUART: 'easeoutquart',
	    EASEINOUTQUART: 'easeinoutquart',
	    EASEINQUINT: 'easeinquint',
	    EASEOUTQUINT: 'easeoutquint',
	    EASEINOUTQUINT: 'easeinoutquint',
	    BOUNCEIN: 'bouncein',
	    BOUNCEOUT: 'bounceout',
	    DEFAULT: 'linear',


	    default: this.linear,

	    linear: function (t) { return t },

	    easeinquad: function (t) { return t*t },

	    easeoutquad: function (t) { return t*(2-t) },

	    easeinoutquad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

	    easeincubic: function (t) { return t*t*t },

	    easeoutcubic: function (t) { return (--t)*t*t+1 },

	    easeinoutcubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

	    easeinquart: function (t) { return t*t*t*t },

	    easeoutquart: function (t) { return 1-(--t)*t*t*t },

	    easeinoutquart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

	    easeinquint: function (t) { return t*t*t*t*t },

	    easeoutquint: function (t) { return 1+(--t)*t*t*t*t },

	    easeinoutquint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

	    /*makeEaseOut: function (deltafunc) {
	     return function (p) {
	     return 1 - deltafunc(1 - p);
	     }
	     },*/
	    bouncein: function (p) {
	        for(var a = 0, b = 1; ; a += b, b /= 2) {
	            if (p >= (7 - 4 * a) / 11) {
	                return -Math.pow((11 - 6 * a - 11 * p) / 4, 2) + Math.pow(b, 2);
	            }
	        }
	    },
	    bounceout: function (p) {
	        return 1 - this.bouncein(1 - p);
	    },


	});

	module.exports = Easings;

/***/ },
/* 11 */
/***/ function(module, exports) {

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

	});

	module.exports = Interacter;



/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */

	var Interaction = Object.create({

	    id: null,
	    btn: null,
	    animations: [],
	    functions: [],
	    preventDefault: false,

	    init: function (btn, event, animation) {
	        this.id = null;
	        this.animations = [];
	        this.functions = [];
	        for(var i = 2; i < arguments.length; i++) {
	            this.addAnimation(arguments[i]);
	        }
	        var o = this;
	        this.btn = btn;
	        this.btn.addEventListener(event, function (e) {o.interact(e);});
	        this.preventDefault = (typeof arguments[arguments.length-1] == 'boolean') ? arguments[arguments.length - 1] : false;

	        return this;

	    },
	    interact: function (e) {
	        if (this.preventDefault)
	            e.preventDefault();
	        for(var k in this.animations) {
	            this.animations[k].start();
	        }
	        for (var k in this.functions) {
	            this.functions[k](e);
	        }
	    },
	    addAnimation: function (animation) {
	        this.animations.push(animation);
	    },
	    addFunction: function (func) {
	        this.functions.push(func);
	    },
	    setId: function (name) {
	        this.id = name;
	    }

	});

	module.exports = Interaction;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */
	var Map = Object.create({
	    domain: null,
	    range: null,
	    init: function (domain, range) {
	        if (typeof domain.delta == 'function') {
	            this.domain = domain;
	        }
	        else if (typeof domain.length != 'undefined') {
	            this.domain = EZI.createRange(domain[0], domain[1]);
	        }
	        else {
	            this.domain = EZI.createRange(0, domain);
	        }
	        if (typeof range.delta == 'function') {
	            this.range = range;
	        }
	        else if (typeof range.length != 'undefined') {
	            this.range = EZI.createRange(range[0], range[1]);
	        }
	        else {
	            this.range = EZI.createRange(0, range);
	        }
	        return this;
	    },
	    calc: function (num) {
	        if (num < this.domain.min || num > this.domain.max)
	            return null;
	        var t = (num - this.domain.min) / this.domain.delta();
	        return t * this.range.delta() + this.range.min;
	    }
	});
	module.exports = Map;

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */
	var Range = Object.create({
	    min: 0,
	    max: 0,
	    delta: function () {
	        return this.max - this.min;
	    },
	    init: function (min, max) {
	        this.min = min;
	        this.max = max;
	        return this;
	    }
	});

	module.exports = Range;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Stijn on 28/02/16.
	 */

	//BUILDER OBJECT
	//APP'S BASE
	var Builder = Object.create({

	    _baseComponents: {},

	    init: function (appName, initialData) {
	        this.setAppName(appName);
	        this._router = Object.create(__webpack_require__(16)).init();
	        this._dataBank = Object.create(__webpack_require__(18)).init(initialData);
	        this._registeredComponents = this._baseComponents;
	        return this;
	    },

	    fireApp: function () {
	        this._renderApp();
	    },

	    setAppName: function (appName) {
	        this._appName = appName;
	    },
	    getAppName: function () {
	        return this._appName;
	    },

	    getDataBank: function () {
	        return this._dataBank;
	    },
	    getRouter: function () {
	        return this._router;
	    },

	    _getRenderedApp: function () {
	        return this.getRouter().getCurrentPage()._startRender();
	    },
	    _renderApp: function () {
	        EZ('body').clear();
	        EZ('body').append(this._getRenderedApp());
	    },
	    defineComponent: function (parentComponent, objToApply) {
	        var newComponent = Object.create(this.getRegisteredComponent(parentComponent));
	        for (var k in objToApply) {
	            newComponent[k] = objToApply[k];
	        }
	        return newComponent;
	    },
	    registerComponent: function (componentName, component) {
	        if (this._registeredComponents[componentName] === undefined)
	            this._registeredComponents[componentName] = component;
	        else
	            console.error('Could not define component. "' + componentName + '" already exists.');
	    },
	    getRegisteredComponent: function (componentName) {
	        return this._registeredComponents[componentName];
	    },
	    createComponent: function (componentName, properties) {
	        return Object.create(this.getRegisteredComponent(componentName)).init(properties, this);
	    },
	    createPage: function (title, properties, rootComponent) {
	        var page = Object.create(__webpack_require__(20)).init(title, properties, this);
	        if (rootComponent)
	            page.setRootComponent(rootComponent);
	        return page;
	    },
	    _addRenderingComponent: function (component) {
	        if (!this._renderingComponents)
	            this._renderingComponents = [];
	        this._renderingComponents.push(component);
	    },
	    _getRenderingComponent: function () {
	        return this._renderingComponents[this._renderingComponents.length-1];
	    },
	    _removeRenderingComponent: function () {
	        this._renderingComponents = this._renderingComponents.slice(0, -1);
	    }


	});

	Builder._baseComponents.Component = __webpack_require__(21);
	Builder._baseComponents.Button = __webpack_require__(22);

	module.exports = Builder;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

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
	        var route = Object.create(__webpack_require__(17)).init(identifier, urlString, page);
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


/***/ },
/* 17 */
/***/ function(module, exports) {

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
	    //if url is like 'users/:user:/posts', dataobj will contain an identifying string for user
	    //like {user: 'user1'}
	    getUrlWithPassedData: function (dataObj) {
	        var urlString = this.getRouteString();
	        for(var k in dataObj) {
	            urlString.replace(':'+k+':', dataObj[k]);
	        }
	        return urlString;
	    }
	});

	module.exports = Route;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Stijn on 01/03/16.
	 */

	//DATABANK OBJECT
	//HOLDS VARIABLES, REFRESHES LISTENING COMPONENTS ON VAR UPDATe
	var DataBank = Object.create({

	    //Initial Data: Array of {name: value} objects
	    init: function (initialData) {
	        this._data = {};
	        (typeof initialData == 'object')?this._dataFromObject(initialData):null;
	        return this;
	    },
	    _dataFromObject: function (object) {
	        var dataObject = {};
	        for (var k in object) {
	            dataObject[k] =  this.createDataVar(k, object[k], typeof object[k]);
	        }
	    },
	    createDataVar: function (name, value, type, listeners) {
	        this._data[name] = Object.create(__webpack_require__(19)).init(name, value, type, listeners);
	        return this.getDataVar(name);
	    },
	    setDataVar: function (name, value) {
	        this._data[name].setValue(value);
	    },
	    getDataVar: function (name, getWholeObject) {
	        return (getWholeObject)?this._data[name]:this._data[name].getValue();
	    },
	    dataVarExists: function (name) {
	        if (this.getDataVar(name, true))
	            return true;
	        return false;
	    },
	    addAsListenerTo: function (object, nameArray) {
	        for (var k in nameArray) {
	            this.getDataVar(nameArray[k], true).addListener(object);
	        }
	    }

	});

	module.exports = DataBank;

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Created by Stijn on 01/03/16.
	 */

	var DataBankVariable = Object.create({

	    init: function (name, value, type, listeners) {
	        listeners = (Array.isArray(listeners))?listeners:[listeners];
	        this.setName(name);
	        this.setType(type);
	        this.setValue(value);
	        this._listeners = (listeners == undefined)?[]:listeners;
	        this._triggersRerender = true;
	        return this;
	    },
	    callToListeners: function () {
	        for (var k in this._listeners) {
	            this._listeners[k]._dataVarChanged(this._triggersRerender);
	        }
	    },
	    addListener: function (listener) {
	        this._listeners.push(listener);
	    },
	    removeListener: function (listener) {
	        var i = this._listeners.getIndexOf(listener);
	        this._listeners.splice(i, 1);
	    },
	    setName: function (name) {
	        this._name = name;
	    },
	    getName: function () {
	        return this._name;
	    },
	    setType: function (type) {
	        this._type = type;
	        this.callToListeners();
	    },
	    getType: function () {
	        return this._type;
	    },
	    setValue: function (value) {
	        if ((this.getType() && typeof value === this.getType()) || value == null) {
	            this._value = value;
	            this.callToListeners();
	        }
	        else
	            console.error('Value is not of the type specified.');
	    },
	    getValue: function () {
	        return this._value;
	    },
	    triggersRerender: function (bool) {
	        this._triggersRerender = bool;
	    },
	});
	module.exports = DataBankVariable;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Stijn on 03/03/16.
	 */
	var Page = Object.create(__webpack_require__(21));

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

/***/ },
/* 21 */
/***/ function(module, exports) {

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
	        this._dataVarChangedHandlers = [];
	        this.componentWillMount();
	        return this;
	    },
	    _dataVarChanged: function (rerender) {
	        this.dataVarsHaveUpdated();
	        this.willUpdate();
	        for (var k in this._dataVarChangedHandlers) {
	            this._dataVarChangedHandlers[k]();
	        }
	        if (rerender)
	            this._startRender();
	    },
	    addDataVarChangedHandler: function (handler) {
	        this._dataVarChangedHandlers.push(handler);
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
	        console.log('rerendering');
	        var returnvalue;
	        this._builder._addRenderingComponent(this);
	        returnvalue = this.render();
	        this._builder._removeRenderingComponent();

	        //REPLACING IN DOM TREE IF NEEDED
	        var prevEl = EZI.Elemental.getElementByEziId(this._elementId);
	        if (prevEl) {
	            console.log('replacing element');
	            returnvalue.replace(prevEl);
	        }
	        this._elementId = returnvalue._getEziId();
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


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Stijn on 02/03/16.
	 */
	/**
	 * Created by Stijn on 02/03/16.
	 */
	//COMPONENT
	//BASIC ELEMENT
	var Button = Object.create(__webpack_require__(21));

	Button.render = function () {
	    var btn = EZI.make('a', {
	        class: 'button ' + this.properties.class,
	        href: (this.properties.link)?this.properties.link:undefined,
	        style: this.properties.style,
	        text: this.properties.text,
	        on: this.properties.on
	    });
	    return btn;
	};


	module.exports = Button;



/***/ }
/******/ ]);
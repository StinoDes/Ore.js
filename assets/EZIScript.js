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
        window.EZ = (function EZ (el, asArray) {
            asArray = (asArray===undefined)?false:asArray;
            if (typeof el == 'string') {
                el = document.querySelectorAll(el);
            }
            if (el == null) {
                return null;
            }
            else if (el.constructor === NodeList) {
                var arr = [];
                for (var i = 0; i < el.length; i++) {
                    arr.push(el.item(i).ezi);
                }
                if (arr.length === 1 && !asArray)
                    return arr[0];
                else
                    return arr;
            }
            else {
                if(asArray)
                    return [el.ezi];
                return el.ezi;
            }
        });
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
                var copy = (obj)?obj._copy:false;
                return this.getApp()._getRenderingComponent().renderChildComponent(elstring, obj, copy);
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
            obj.on = undefined;
        }
        if (obj.children) {
            for (var k in obj.children) {
                var tag = Object.keys(obj.children[k])[0];
                element.append(EZI.make(tag, obj.children[k][tag]));
            }
            obj.children = undefined;
        }
        for (var k in obj) {
            if (obj[k] !== undefined && obj[k] !== null)
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
    },
    createDataStore: function (initialData) {
        return require('./Builder/utilities/DataStore').init(initialData);
    }

});

EZI.Elemental = require('./Elemental/Elemental');
EZI.EziElement = require('./Elemental/EziElement');
EZI.CSSProps = require('./Elemental/CSSProps');

EZI.AniManager = require('./AniManager/AniManager');
EZI.Animation = require('./AniManager/Animation');
EZI.AnimatedProperty = require('./AniManager/AnimatedProperty');
EZI.AnimationStep = require('./AniManager/AnimationStep');
EZI.StepProperty = require('./AniManager/StepProperty');
EZI.Easings = require('./AniManager/Easings');

EZI.Interacter = require('./Interacter/Interacter');
EZI.Interaction = require('./Interacter/Interaction');

EZI.Map = require('./Util/Map');
EZI.Range = require('./Util/Range');

EZI.Builder = require('./Builder/Builder');

module.exports = EZI;
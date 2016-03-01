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

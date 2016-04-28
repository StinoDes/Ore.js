import Class from './class';
import maps  from './maps';
import initQuarry from './Quarry';
export default EZI = Class.extend({
    init () {
        console.log('test');
        this.Quarry = initQuarry(this.Class);
        return this;
    },
    Class: {
        value: Class,
        visible: false,
        editable: false
    },
    maps: {
        value: maps,
        visible: false,
        editable: false
    },
    craft: {
        value (tag, config) {
            var el = document.createElement(tag);
            console.log(this.maps._craftConfigMap(config));
            return el;
        },
        visible: true,
        editable: false
    },
    collect: {
        value (element, asArray) {
            if (typeof element === 'string')
                return this.Quarry.reclaim(document.querySelectorAll(element));
            else if (typeof element === 'object')
                return this.Quarry.reclaim(element);
        }
    }
}).init();
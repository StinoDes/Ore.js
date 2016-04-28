import Class from './class';
import maps  from './maps';
import initQuarry from './Quarry';
import initRefiner from './Refiner';
export default EZI = Class.extend({
    init () {
        this.Quarry = initQuarry(this.Class);
        this.Refiner = initRefiner(this.Class);
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
            var el = this.collect(document.createElement(tag));
            if (config) {
                config = this.maps._craftConfigMap(config) || {};
                el.apply(config);
            }
            return el;
        },
        visible: true,
        editable: false
    },
    collect: {
        value (element, asArray) {
            let arr;
            if (typeof element === 'string')
                arr = this.Quarry.reclaim(document.querySelectorAll(element));
            else if (typeof element === 'object')
                arr = this.Quarry.reclaim([element]);
            if (arr.length === 1 && !asArray)
                return arr[0];
            return arr;
        }
    }
}).init();
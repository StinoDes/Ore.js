import Class from './class';
import coreMaps  from './../maps/core';
import maps from '../maps';
import initQuarry from './Quarry';
import initRefiner from './Refiner';
import { initEasings } from '../glimmer';
export default EZI = Class.extend({
    init () {
        this.Quarry = initQuarry(this.Class);
        this.Refiner = initRefiner(this.Class);
        this.easings = initEasings(this.Class).create();
        return this;
    },
    _modules: {
        value: {},
        visible: false,
        editable: false
    },
    Class: {
        value: Class,
        visible: false,
        editable: false
    },
    maps: {
        value: { ...maps },
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
        value (selector, asArray) {
            let batch;
            if (typeof selector === 'string')
                batch = this.Quarry.reclaim(document.querySelectorAll(selector));
            else if (typeof selector === 'object')
                batch = this.Quarry.reclaim([selector]);
            if (batch.length === 1 && !asArray)
                return batch.mineral(0);
            return batch;
        }
    }
}).init();
import Class from './class';
import coreMaps  from './../maps/core';
import maps from '../maps';
import initQuarry from './Quarry';
import initRefiner from './Refiner';
import initGlimmer from '../glimmer';
export default EZI = Class.extend({
    init () {
        this.newProperty('Quarry', {value: initQuarry(this.Class), visible: false, editable: false});
        this.newProperty('Refiner', {value: initRefiner(this.Class), visible: false, editable: false});
        initGlimmer.bind(this)(Class);
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
        value (selector, asBatch) {
            let batch;
            if (typeof selector === 'string')
                batch = this.Quarry.reclaim(document.querySelectorAll(selector));
            else if (selector._mined)
                batch = this.Quarry.Batch.create([selector]);
            else if (typeof selector === 'object')
                batch = this.Quarry.reclaim([selector]);
            if (batch.length === 1 && !asBatch)
                return batch.mineral(0);
            return batch;
        }
    }
}).init();
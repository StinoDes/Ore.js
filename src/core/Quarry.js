/**
 * Created by Stijn on 28/04/16.
 */
import { randomString } from '../utils';
import initMineral from './Mineral';
import initBatch from './Batch';
import { initGlimmer } from '../glimmer';
export default function (Class) {
    var Quarry = Class.extend({
        _loaded: {
            value: false,
            editable: true,
            visible: false
        },
        _cache: {
            value: {_minerals: [], _glimmers: []},
            editable: true,
            visible: false
        },
        init (element, id) {
            //console.log('test');
            var self = this;
            if (!window.Element.prototype.hasOwnProperty('mine')) {
                Object.defineProperty(window.Element.prototype, 'mine', {
                    get: function () {
                        return self.mineMineral(this);
                    }
                });
            }
            this.newProperty('Mineral', {value: initMineral(Class), editable: false});
            this.newProperty('Batch', {value: initBatch(Class), editable: false});
            return this;
        },
        mineMineral: {
            value (element) {
                if (!this._cache._minerals[element.__mined__]) {
                    element.__mined__ = this._genD('mineral');
                    this._cache._minerals[element.__mined__] = this.Mineral.create(element, element.__mined__);
                }
                return this._cache._minerals[element.__mined__];
            },
            editable: false,
            visible: false
        },
        shineGlimmer: {
            value (config) {
                if (!config.shined) {
                    config.shined = this._genD('glimmer');
                    this._cache._glimmers[config.shined] = this.Glimmer.create(config);
                }
                return this._cache._glimmers[config.shined];
            }
        },
        reclaim: {
            value (nodelist) {
                return this.Batch.create(Array.prototype.slice.call(nodelist).map(el => this.mineMineral(el)));
            },
            editable: false,
            visible: false
        },
        _genD: {
            value (type) {
                let str = randomString(8, 'aA');
                if (this._cache['_'+type+'s'][str])
                    return this._genD(type);
                return str;
            },
            editable: false,
            visible: false
        }
    });
    return Quarry.create();
}

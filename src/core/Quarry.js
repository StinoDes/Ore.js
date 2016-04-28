/**
 * Created by Stijn on 28/04/16.
 */
import { randomString } from '../utils';
import initElement from './Element';
export default function (Class) {
    var Quarry = Class.extend({
        _loaded: {
            value: false,
            editable: true,
            visible: false
        },
        _cache: {
            value: [],
            editable: true,
            visible: false
        },
        init (element, id) {
            //console.log('test');
            var self = this;
            if (!window.Element.prototype.hasOwnProperty('mine')) {
                Object.defineProperty(window.Element.prototype, 'mine', {
                    get: function () {
                        return self.mineElement(this);
                    }
                });
            }
            Object.defineProperty(this, 'Element', {value: initElement(Class), writable: false, configurable: false, enumerable: false});
            return this;
        },
        mineElement: {
            value (element) {
                if (!this._cache[element.__mined__]) {
                    element.__mined__ = this._genD();
                    this._cache[element.__mined__] = this.Element.create(element, element.__mined__);
                }
                return this._cache[element.__mined__];
            },
            editable: false,
            visible: false
        },
        reclaim: {
            value (nodelist) {
                return Array.prototype.slice.call(nodelist).map(el => this.mineElement(el));
            },
            editable: false,
            visible: false
        },
        _genD: {
            value () {
                let str = randomString(8, 'aA');
                if (this._cache[str])
                    return this._genD();
                return str;
            },
            editable: false,
            visible: false
        }
    });
    return Quarry.create();
}

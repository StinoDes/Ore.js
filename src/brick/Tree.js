/**
 * Created by Stijn on 11/05/16.
 */
import { randomString } from '../utils';

export default function (Class) {
    return Class.extend({
        _tree: {
            value: {},
            visible: false
        },
        _refs: {
            value: {},
            visible: false,
        },
        init (tree) {
            this._tree = tree||{};
            this._refs = {};
            return this;
        },
        set (tree) {
            this._tree = tree;
        },
        tag (tag, config, children) {
            //tag('div', {}, [
            //    tag('a', {}),
            //    tag('a', {})
            //])

            //div: {
            //    a: {},
            //    a: {}
            //}
            let obj = {},
                rtrn = {};
            if (config.ref) {
                obj.ref = config.ref;
                delete config.ref;
            }
            obj.config = config;
            for (var k in children) {
                obj[Object.keys(children[k])[0]] = children[k][Object.keys(children[k])[0]];
            }
            rtrn[this._genTag(tag)] = obj;
            return rtrn;
        },
        brick (brick) {
            let rtrn = {};
            rtrn[this._genTag('brick')] = brick;
            return rtrn;
        },
        process (config) {
            var mineral;
            if (Object.keys(this._tree).length > 1) {
                console.error('There should only be one top-level tag per tree.');
                return;
            }
            for ( var k in this._tree ) {
                let subconfig = {};
                if (this._tree[k] && this._tree[k].config) {
                    subconfig = this._tree[k].config;
                }
                mineral = this._processMineral(k, this._tree[k], subconfig);
            }
            return mineral;
        },
        _processMineral: {
            value (key, subtree, config) {
                let mineral = Ore.craft(this._parseTag(key), config),
                    children = [];
                for (var k in subtree) {
                    let subconfig = {};
                    if (subtree[k] && subtree[k].config)
                        subconfig = subtree[k].config;
                    else
                        subconfig = {};

                    if (!/([a-z0-9]+\.[a-z0-9]{5})/i.test(k))
                        continue;
                    else if (/(brick\.[a-zA-Z0-9])/.test(k)) {
                        console.log('should render brick', k, subtree[k]);
                        children.push(subtree[k]._callRender('return'));
                    }
                    else
                        children.push(this._processMineral(k, subtree[k], subconfig));
                }
                mineral.do({append: children});
                if (subtree.ref)
                    this._refs[subtree.ref] = mineral;
                return mineral;
            },
            visible: false,
            editable: false
        },
        _genTag: {
            value (tag) {
                return tag+'.'+randomString(5, 'Aa#');
            },
            visible: false,
            editable: false
        },
        _parseTag: {
            value (tag) {
                return tag.split('.')[0];
            },
            visible: false,
            editable: false
        }
    });
}

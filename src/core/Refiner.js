/**
 * Created by Stijn on 28/04/16.
 */
export default function (Class) {
    let Refiner = Class.extend({
        init () {
            return this;
        },
        _addRules: {
            value (element) {
                let rules = element._styles;
                for (var k in rules) {
                    element.getElement().style[k] = rules[k];
                }
            },
            editable: false,
            visible: false
        },
        refineMineral(mineral) {
            this._addRules(mineral)
        },
    });
    return Refiner.create();
}
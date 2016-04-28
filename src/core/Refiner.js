/**
 * Created by Stijn on 28/04/16.
 */
export default function (Class) {
    let Refiner = Class.extend({
        init () {
            this._sheet = this.createSheet();
            return this;
        },
        _sheet: {
            value: null,
            editable: true,
            visible: false
        },
        _addRules: {
            value (sheet, selector, rules) {
                let ruleForSelector;
                Array.prototype.slice.call(sheet.rules).map(rule => {
                    if (rule.selectorText === selector)
                        ruleForSelector = rule;
                });
                if (ruleForSelector === undefined) {
                    let i = sheet.rules.length;
                    if ('insertRule' in sheet) {
                        sheet.insertRule(selector + '{ }', i);
                    }
                    else if ('addRule' in sheet) {
                        sheet.addRule(selector, '', i);
                    }
                    ruleForSelector = sheet.rules[i];
                }
                console.log(rules);
                for (var k in rules) {
                    ruleForSelector.style[k] = rules[k];
                }
            },
            editable: false,
            visible: false
        },
        createSheet () {
            let style = document.createElement('style');
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style.sheet;
        },
        refineElement(element, stylesheet) {
            this._addRules(stylesheet || this._sheet, `[mined=${element._mined}]`, element._styles)
        },
        refineSelection(selector, styles, stylesheet) {
            this._addRules(stylesheet || this._sheet, selector, styles);
        }
    });
    return Refiner.create();
}
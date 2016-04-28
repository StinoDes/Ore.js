/**
 * Created by Stijn on 28/04/16.
 */
export default function (Class) {
    return Class.extend({
        configurations: {
            value: {},
            visible: true,
            writable: true,
        },
        init (element, id) {
            this._element = element;
            this._mined = id;
            this._element.setAttribute('mined', this._mined);
            return this;
        },
        getElement () {
            return this._element;
        },
        set (config) {
            this.configurations = {
                ...this.configurations,
                ...config
            }
        },
        do (config) {
            for (let k in config) {
                if (this.configurations[k] === undefined)
                    continue;
                else if (config[k].constructor === Array)
                    this.configurations[k].apply(this, config[k]);
                else
                    this.configurations[k].call(this, config[k]);
                delete config[k];
            }
            this.apply(EZI.maps._craftConfigMap(config));
        },
        apply (config) {
            if (config.children.length)
                this._append(config.children);
            if (Object.keys(config.styles).length)
                this._applyStyles(config.styles);
        },

        _styles: {
            value: {},
            editable: true,
            visible: false
        },
        _applyStyles: {
            value (styles) {
                this._styles = {
                    ...this._styles,
                    ...styles
                };
                EZI.Refiner.refineElement(this);
            },
            editable: false,
            visible: false
        },
        _append: {
            value (children) {
                for (let k in children) {
                    let child = children[k];
                    this._element.appendChild((child._mined) ? child._element : child);
                }
            },
            editable: false,
            visible: false
        }
    })
}

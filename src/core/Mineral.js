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
            if (config.text)
                this._applyText(config.text);
            if (Object.keys(config.attr).length)
                this._applyAttr(config.attr);
            if (Object.keys(config.class).length)
                this._applyClass(config.class);
            if (Object.keys(config.events).length)
                this._applyEvents(config.events);
        },
        _styles: {
            value: {},
            editable: true,
            visible: false
        },
        _eventHandlers: {
            value: {},
            editable: true,
            visible: false
        },
        _generateHandler: {
            value () {
                let handler = function (e) {
                    let handlers = this._eventHandlers[e.type];
                    for (var k in handlers) {
                        handlers[k](e);
                    }
                };
                return handler.bind(this);
            },
            editable: false,
            visible: false
        },
        _applyEvents: {
            value (events) {
                for (var k in events) {
                    if (!this._eventHandlers[k]) {
                        this._eventHandlers[k] = [];
                        this._element.addEventListener(k, this._generateHandler(k));
                    }
                    console.log(events[k].prototype);
                    if (events[k].constructor === Array)
                        this._eventHandlers[k] = [...this._eventHandlers[k], ...events[k]]
                    else
                        this._eventHandlers[k].push(events[k]);
                }
            },
            editable: false,
            visible: false
        },
        _applyStyles: {
            value (styles) {
                this._styles = {
                    ...this._styles,
                    ...styles
                };
                EZI.Refiner.refineMineral(this);
            },
            editable: false,
            visible: false
        },
        _applyText: {
            value (text) {
                var childTextNode;
                for (var i = 0; i < this._element.childNodes.length; i++) {
                    if (this._element.childNodes[i].nodeName == '#text') {
                        childTextNode = this._element.childNodes[i];
                    }
                }
                if (!childTextNode) {
                    childTextNode = document.createTextNode();
                    this._element.appendChild(childTextNode);
                }
                childTextNode.nodeValue = text;
            },
            editable: false,
            visible: false
        },
        _applyAttr: {
            value (attr) {
                for (var k in attr) {
                    this._element.setAttribute(k, attr[k]);
                }
            },
            visible: false,
            editable: false
        },
        _applyClass: {
            value (classActions) {
                let { set, remove, add, toggle } = classActions;
                if (set)
                    this._element.setAttribute('class', set);
                if (remove)
                    this._element.classList.remove(remove);
                if (add)
                    this._element.classList.add(add);
                if (toggle)
                    this._element.classList.toggle(toggle);
            },
            visible: false,
            editable: false
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

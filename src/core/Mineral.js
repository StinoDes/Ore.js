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
        extract (config) {
            config = EZI.maps._extractConfigMap(config);
            console.log(config);
            return {
                class: this._extractClass(config.class),
                styles: this._extractStyles(config.styles),
                attr: this._extractAttr(config.attr)
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
            this.apply(EZI.maps._doConfigMap(config));
        },
        apply (config) {
            console.log(config.children);
            if (config.children.append.minerals.length || config.children.prepend.minerals.length)
                this._applyChildren(config.children);
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
                    for (let k in handlers) {
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
                for (let k in events) {
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
        _extractStyles: {
            value (styles) {
                let rtrnobj = {},
                    computed = window.getComputedStyle(this._element);
                for (let k in styles) {
                    rtrnobj[k] = computed[k];
                }
                return rtrnobj;
            },
            editable: false,
            visible: false
        },
        _applyText: {
            value (text) {
                let childTextNode;
                for (let i = 0; i < this._element.childNodes.length; i++) {
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
                for (let k in attr) {
                    this._element.setAttribute(k, attr[k]);
                }
            },
            visible: false,
            editable: false
        },
        _extractAttr: {
            value (attr) {
                let rtrnobj = {};
                for (let k in attr) {
                    rtrnobj[k] = this._element.getAttribute(k);
                }
                return rtrnobj;
            },
            editable: false,
            visible: false
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
        _extractClass: {
            value (classActions) {
                let rtrnobj = {};
                if (classActions.has)
                    rtrnobj.has = this._element.classList.contains(classActions.has);
                if (classActions.get)
                    rtrnobj.has = this._element.getAttribute('class');
                return rtrnobj;
            },
            visible: false,
            editable: false
        },
        _applyChildren: {
            value (children) {
                console.log(children);
                let {append, prepend} = children,
                    appendChild = (mineral, index) => {
                        if (!mineral._mined)
                            mineral = EZI.collect(mineral);
                        if (index === null)
                            this._element.appendChild(mineral.getElement());
                        else {
                            if (this._element.childNodes.item(index+1))
                                this._element.insertBefore(mineral.getElement(), this._element.childNodes.item(index+1));
                            else
                                appendChild(mineral, null);

                        }
                    },
                    prependChild = (mineral, index) => {
                        if (!this._element.firstElementChild || index >= this._element.childNodes.length)
                            appendChild(mineral, null);
                        if (index === null)
                            this._element.insertBefore(mineral.getElement(), this._element.firstElementChild);
                        else
                            this._element.insertBefore(mineral.getElement(), this._element.childNodes.item(index));
                    }
                for (var k in append.minerals) {
                    appendChild(append.minerals[k], append.index);
                }
                for (var k in prepend.minerals) {
                    prependChild(prepend.minerals[k], prepend.index);
                }
            },
            editable: false,
            visible: false
        }
    })
}

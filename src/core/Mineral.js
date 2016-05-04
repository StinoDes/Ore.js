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
        _glimmers: {
            value: [],
            visible: false,
            writable: true
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
            if (config === '*')
                config = {
                    class: { get: ''},
                    styles: '*',
                    attr: '*',
                    text: '',
                    glimmers: '*',
                    children: '*'
                };
            else
                config = EZI.maps._extractConfigMap(config);
            let text = (config.text !== undefined && config.text !== null)?this._extractText():undefined,
                glimmers = (config.glimmers !== undefined && config.glimmers !== null)?this._extractGlimmers(config.glimmers):undefined,
                children = (config.children !== undefined && config.children !== null)?this._extractChildren(config.children):undefined;
            return {
                class: this._extractClass(config.class),
                styles: this._extractStyles(config.styles),
                attr: this._extractAttr(config.attr),
                text, glimmers, children
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
            if (config.glimmers)
                this._initGlimmers(config.glimmers);
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
                    computed = window.getComputedStyle(this._element, null);
                if (styles === '*')
                    return { ...computed};
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
        _extractText: {
            value (b) {
                return this._element.textContent.replace(/\s+/g, ' ').trim();
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
                if (attr === '*') {
                    Array.prototype.slice.call(this._element.attributes).forEach(function(item) {
                        rtrnobj[item.name] = item.value;
                    });
                    return rtrnobj;
                }
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
                let {append, prepend} = children,
                    appendChild = (mineral, index) => {
                        if (!mineral._mined) {
                            let batch = EZI.collect(mineral, true);
                            batch.loop((mineral, index) => { appendChild(mineral, null) });
                            return;
                        }
                        if (index === null || index === undefined)
                            this._element.appendChild(mineral.getElement());
                        else {
                            if (this._element.children.item(index+1))
                                this._element.insertBefore(mineral.getElement(), this._element.children.item(index+1));
                            else
                                appendChild(mineral, null);

                        }
                    },
                    prependChild = (mineral, index) => {
                        if (!mineral._mined) {
                            let batch = EZI.collect(mineral, true);
                            batch.loop((mineral, index) => { prependChild(mineral, null) });
                            return;
                        }
                        if (!this._element.firstElementChild || index >= this._element.children.length)
                            appendChild(mineral, null);
                        if (index === null || index === undefined)
                            this._element.insertBefore(mineral.getElement(), this._element.firstElementChild);
                        else
                            this._element.insertBefore(mineral.getElement(), this._element.children.item(index));
                    };
                for (var k in append.minerals) {
                    appendChild(append.minerals[k], append.index);
                }
                for (var k in prepend.minerals) {
                    prependChild(prepend.minerals[k], prepend.index);
                }
            },
            editable: false,
            visible: false
        },
        _extractChildren: {
            value (i) {
                if (i === '*' || typeof i !== 'number')
                    return Array.prototype.slice.call(this._element.children);
                return Array.prototype.slice.call(this._element.children)[i];
            },
            editable: false,
            visible: false
        },
        _initGlimmers: {
            value (glimmers) {
                console.log({ mineral: this, ...glimmers[0]});
                for (var k in glimmers) {
                    this._glimmers.push(EZI.Quarry.Glimmer.create({ mineral: this, ...glimmers[k]}));
                }
            },
            editable: false,
            visible: false
        },
        _extractGlimmers: {
            value (i) {
                if (i === '*') {
                    return this._glimmers;
                }
                return this._glimmers[i];
            },
            editable: false,
            visible:false
        }
    })
}

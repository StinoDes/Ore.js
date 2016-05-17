const Class = Object.create(Object.prototype, {
    create: {
        value () {
            let inst = Object.create(this);
            return inst.init.apply(inst, Array.prototype.slice.call(arguments));
        }
    },
    init: {
        value () {
            return this;
        }
    },
    newProperty: {
        value (name, val) {
            let descriptor = {};
            if (typeof val === 'object') {
                let { value, get, set, visible, editable } = val,
                    v = {};
                if ((value !== undefined || editable !== undefined ) && (get || set))
                    console.warn('Can\'t define a \'get\' or \'set\' with a value and editable. Prioritising value if present');
                if (value !== undefined)
                    v = {value, writable: editable !== undefined ? editable : true,};
                else
                    v = {get, set};
                descriptor = {
                    ...v,
                    configurable: editable !== undefined ? editable : true,
                    enumerable: visible !== undefined ? visible : true,
                }
            }
            else {
                let value = val;
                descriptor = {
                    value,
                    writable: true,
                    configurable: true,
                    enumerable: true
                }
            }
            Object.defineProperty(this, name, descriptor);
        }
    },
    extend: {
        value (objectToAdd) {
            let descriptor = {};
            for (var k in objectToAdd) {
                if (objectToAdd[k] && typeof objectToAdd[k] === 'object') {
                    let { value, get, set, visible, editable } = objectToAdd[k],
                        v = {};
                    if ((value !== undefined || editable !== undefined ) && (get || set))
                        console.warn('Can\'t define a \'get\' or \'set\' with a value and editable. Prioritising value if present');
                    if (value !== undefined)
                        v = {value, writable: editable !== undefined ? editable : true,};
                    else
                        v = {get, set};
                    descriptor[k] = {
                        ...v,
                        configurable: editable !== undefined ? editable : true,
                        enumerable: visible !== undefined ? visible : true,
                    }
                }
                else {
                    let value = objectToAdd[k];
                    descriptor[k] = {
                        value,
                        writable: true,
                        configurable: true,
                        enumerable: true
                    }
                }
            }
            let child = Object.create(this, descriptor);
            Object.defineProperty(child, 'parent', {
                value: this
            });
            Object.defineProperty(child, 'super', {
                value: this.init.bind(child)
            });
            if (child.init) {
                if (!/(return\s)/i.test(child.init.toString())) {
                    console.error('init() does not return anything. It should return at least something that has been initialised.');
                    return null;
                }
            }
            return child;
        }
    }
});
export default Class;
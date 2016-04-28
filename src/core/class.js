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
    extend: {
        value (objectToAdd) {
            let descriptor = {};
            for (var k in objectToAdd) {
                if (typeof objectToAdd[k] === 'object') {
                    let value = objectToAdd[k]['value'],
                        visible = objectToAdd[k]['visible'],
                        editable = objectToAdd[k]['editable'];
                    descriptor[k] = {
                        value,
                        writable: editable !== undefined ? editable: true,
                        configurable: editable !== undefined ? editable: true,
                        enumerable: visible !== undefined ? visible: true,
                    }
                }
                else {
                    let value = objectToAdd[k];
                    descriptor[k] = {
                        value,
                        writable: true,
                        configurable: true,
                        editable: true
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
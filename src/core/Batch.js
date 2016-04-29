export default function (Class) {
    return Class.extend({
        init (minerals) {
            this._minerals = minerals;
            return this;
        },
        mineral (index) {
            if (typeof index === 'number')
                return this._minerals[index];
            else if (typeof index === 'string') {
                for (var k in this._minerals) {
                    if (this._minerals[k]._mined === index)
                        return this._minerals[k];
                }
            }
        },
        set (config) {
            for (var k in this._minerals) {
                this._minerals[k].set(config);
            }
        },
        do (config) {
            for (var k in this._minerals) {
                this._minerals[k].do(config);
            }
        },
        apply (config) {
            for (var k in this._minerals) {
                this._minerals[k].apply(config);
            }
        },
        length: {
            get () {
                return this._minerals.length
            }
        }
    });
}
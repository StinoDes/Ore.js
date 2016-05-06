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
            this.loop(mineral => mineral.set(config));
        },
        do (config) {
            this.loop(mineral => mineral.do(Ore.cloneConfig(config)));
        },
        apply (config) {
            this.loop(mineral => mineral.apply(config));
        },
        extract (config) {
            let rtrn = [];
            this.loop(mineral => rtrn.push(mineral.extract(config)));
            return rtrn;
        },
        loop (callback) {
            for (var k in this._minerals) {
                callback(this._minerals[k], k);
            }
        },
        length: {
            get () {
                return this._minerals.length
            }
        }
    });
}
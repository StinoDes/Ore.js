export default function (Class) {
    return Class.extend({
        init (glimmers) {
            this._glimmers = glimmers;
            return this;
        },
        glimmer (index) {
            if (typeof index === 'number')
                return this._glimmers[index];
        },
        set (config) {
            this.loop(glimmer => glimmer.set(config));
        },
        do (config) {
            this.loop(glimmer => glimmer.do(config));
        },
        apply (config) {
            this.loop(glimmer => glimmer.apply(config));
        },
        loop (callback) {
            for (var k in this._glimmers) {
                callback(this._glimmers[k], k);
            }
        },
        length: {
            get () {
                return this._glimmers.length
            }
        }
    });
}
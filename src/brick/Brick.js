export default function (Class) {
    return Class.extend({
        init (config) {
            this.conf = config;
            return this;
        },
        _applyConf: {
        },
        _conf: {
            value: {},
            visible: false
        },
        conf: {
            get () {
                return this._conf;
            },
            set (newConf) {
                this._conf = {...{}, ...this._conf, ...newConf}
            }
        },
        preBuild () {

        },
        build () {
            return this.config.children;
        },
        postBuild () {

        },
        _buildBrick: {
            value (config) {
            },
            visible: false,
            editable: false
        }
    })
}
export default function (Class) {
    return Class.extend({
        configurations: {
            value: {}
        },
        init (config) {
            this.configurations = {};
            this.set(config);
            return this;
        },
        set (config) {
            this.configurations = {...this.configurations, ...config};
        },
        do (config) {
            config = Ore.maps._predoBrickConfigMap(config);
            for (var k in config) {
                if (this.configurations[k]) {
                    if (config[k].constructor === Array)
                        this.configurations[k].call(this, config[k]);
                    else
                        this.configurations[k](config[k]);
                }
            };
            this.apply(Ore.maps._doBrickConfigMap(config));
        },
        apply (config) {

            this._callRender(config._method.render);
        },
        _callRender: {
            value (render) {
                if (render !== undefined) {
                    if (!this.configurations.rootMineral) {
                        console.error('Define a rootMineral by passing it in the config to set.');
                        return;
                    }
                    if (render.constructor === Array)
                        this.configurations.render.apply(this, [this.configurations.rootMineral, ...render]);
                    else
                        this.configurations.render.call(this, this.configurations.rootMineral, render);
                }
            },
            editable: false,
            visible: false
        }
    })
}
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
            }
        },
    })
}